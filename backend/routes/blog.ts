import type { FastifyInstance, FastifyRequest } from 'fastify';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { v4 as uuidv4 } from 'uuid';


// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing required Cloudinary credentials: cloud_name, api_key, and api_secret must be set in environment variables");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});


export default async function blogRoutes(fastify: FastifyInstance) {
  
  fastify.post(
    '/create',
    { preHandler: [fastify.authenticate] },
    async (request: FastifyRequest, reply) => {
      if (!request.isMultipart()) {
        return reply.code(415).send({
          message: 'Unsupported Media Type: multipart/form-data is required',
        });
      }

      try {
        const parts = request.parts();

        let title = '';
        let author = '';
        let description = '';
        let tags: string[] = [];
        let pubDate = '';
        let popular = false;
        const imageUrls: string[] = [];

        for await (const part of parts) {
          if (part.type === 'file') {
            const buffer = await new Promise<Buffer>((resolve, reject) => {
              const chunks: Buffer[] = [];
              part.file.on('data', (chunk) => chunks.push(chunk));
              part.file.on('end', () => resolve(Buffer.concat(chunks)));
              part.file.on('error', reject);
            });

            const uniqueFilename = `${uuidv4()}-${part.filename.replace(/[^a-zA-Z0-9.-]/g, '')}`;

            
            const url = await new Promise<string>((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: 'blogs',
                  public_id: uniqueFilename.split('.')[0],
                  resource_type: 'image',
                },
                (error, result) => {
                  if (error || !result) return reject(error);
                  resolve(result.secure_url);
                }
              );
              streamifier.createReadStream(buffer).pipe(uploadStream);
            });

            imageUrls.push(url);
          } else {
            if (part.fieldname === 'title') title = part.value as string;
            if (part.fieldname === 'author') author = part.value as string;
            if (part.fieldname === 'description') description = part.value as string;
            if (part.fieldname === 'pubDate') pubDate = part.value as string;
            if (part.fieldname === 'popular') popular = part.value === 'true';
            if (part.fieldname === 'tags') {
              try {
                tags = JSON.parse(part.value as string);
              } catch {
                tags = [];
              }
            }
          }
        }

        if (!title || !description || imageUrls.length === 0) {
          return reply.code(400).send({ message: 'Missing required fields' });
        }

        const parsedPubDate =
          pubDate && !isNaN(Date.parse(pubDate)) ? new Date(pubDate) : new Date();

        const newBlog = await fastify.db.blog.create({
          data: {
            title,
            author,
            description,
            tags: JSON.stringify(tags),
            images: imageUrls,
            pubDate: parsedPubDate,
            popular,
          },
        });

        reply.code(201).send(newBlog);
      } catch (error) {
        console.error('Error uploading image or creating blog:', error);
        reply.code(500).send({ message: 'Error creating blog', error });
      }
    }
  );

  fastify.get('/blogs', async (request, reply) => {
    try {
      const blogs = await fastify.db.blog.findMany();
      reply.send(blogs);
    } catch (error) {
      reply.code(500).send({ message: 'Error fetching blogs', error });
    }
  });

  fastify.get('/:id', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const blog = await fastify.db.blog.findFirst({ where: { id } });
      reply.code(200).send(blog);
    } catch (error) {
      reply.code(500).send({ message: 'Error fetching blog', error });
    }
  });

  fastify.delete('/:id', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await fastify.db.blog.delete({ where: { id } });
      reply.code(200).send({ message: 'Blog deleted successfully' });
    } catch (error) {
      reply.code(500).send({ message: 'Error deleting blog', error });
    }
  });
}
