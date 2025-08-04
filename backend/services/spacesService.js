// backend/services/spacesService.js - Complete updated file
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const OpenAI = require('openai');

class SpacesService {
    constructor() {
        this.spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);
        this.s3 = new AWS.S3({
            endpoint: this.spacesEndpoint,
            accessKeyId: process.env.SPACES_ACCESS_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY,
            region: process.env.SPACES_REGION,
            s3ForcePathStyle: false,
            signatureVersion: 'v4'
        });
        this.bucketName = process.env.SPACES_BUCKET;
        
        // Initialize OpenAI for DALL-E
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    // Theme selection based on article content
    selectImageTheme(title, category) {
        const titleLower = title.toLowerCase();
        
        // Apple, Samsung flagship = Tech Noir (Red + Black)
        if (titleLower.includes('apple') || titleLower.includes('iphone') || 
            titleLower.includes('samsung') || titleLower.includes('galaxy') ||
            titleLower.includes('premium') || titleLower.includes('flagship')) {
            return 'tech-noir';
        }
        
        // Gaming, Performance, Battery = Electric Performance (Blue + Orange)
        if (titleLower.includes('gaming') || titleLower.includes('performance') || 
            titleLower.includes('battery') || titleLower.includes('power') ||
            titleLower.includes('speed') || titleLower.includes('fast')) {
            return 'electric-performance';
        }
        
        // Camera, AI, Innovation = Innovation Spotlight (Yellow + Purple)
        if (titleLower.includes('camera') || titleLower.includes('ai') || 
            titleLower.includes('photo') || titleLower.includes('vision') ||
            titleLower.includes('innovation') || titleLower.includes('breakthrough')) {
            return 'innovation-spotlight';
        }

        // Default based on category
        return category === 'today' ? 'tech-noir' : 'innovation-spotlight';
    }

    // Extract device name for more specific prompts
    extractDeviceName(title) {
        const devices = [
            'iPhone', 'Samsung Galaxy', 'Realme', 'OnePlus', 'Vivo', 
            'Xiaomi', 'Google Pixel', 'Nothing Phone', 'Honor', 'Oppo'
        ];
        
        const found = devices.find(device => 
            title.toLowerCase().includes(device.toLowerCase())
        );
        
        return found || 'smartphone';
    }

    // Tech Noir theme prompt (Red + Black for premium devices)
    getTechNoirPrompt(title) {
        const deviceName = this.extractDeviceName(title);
        return `Create a dramatic premium tech thumbnail: ${deviceName} in sleek black environment with intense red lighting effects, pure black background with subtle geometric tech patterns, device positioned at dynamic 45-degree angle, glowing red accents highlighting key features, high contrast red and black color scheme, cinematic mood with sharp shadows and highlights, premium luxury feeling, YouTube thumbnail style optimized for maximum clicks, no text overlays, ultra-sharp focus, urgent and exclusive aesthetic, professional product photography lighting`;
    }

    // Electric Performance theme prompt (Blue + Orange for gaming/performance)
    getElectricPrompt(title) {
        const deviceName = this.extractDeviceName(title);
        return `Create an electric performance thumbnail: ${deviceName} with neon blue energy effects radiating outward, vibrant orange power burst patterns, dark technological background with circuit board elements, electric blue lighting highlighting performance features, dynamic composition suggesting speed and unlimited power, high contrast neon blue and orange colors, futuristic energy mood with glowing effects, YouTube thumbnail optimized for gaming audience, no text overlays, powerful and exciting feeling, cyberpunk aesthetic`;
    }

    // Innovation Spotlight theme prompt (Yellow + Purple for camera/AI)
    getInnovationPrompt(title) {
        const deviceName = this.extractDeviceName(title);
        return `Create an innovative breakthrough thumbnail: ${deviceName} with golden yellow spotlight effects highlighting main feature, royal purple gradient background with innovation elements, device showcasing camera or AI capability prominently, bright yellow burst patterns suggesting breakthrough technology, luxury purple accents and gradients, high contrast yellow and purple color scheme, creative and premium mood, YouTube thumbnail style for tech innovation, no text overlays, curiosity and innovation feeling, modern artistic composition`;
    }

    // Generate themed DALL-E image
    async generateThemedImage(title, category) {
        try {
            const theme = this.selectImageTheme(title, category);
            let prompt;

            switch (theme) {
                case 'tech-noir':
                    prompt = this.getTechNoirPrompt(title);
                    break;
                case 'electric-performance':
                    prompt = this.getElectricPrompt(title);
                    break;
                case 'innovation-spotlight':
                    prompt = this.getInnovationPrompt(title);
                    break;
                default:
                    prompt = this.getInnovationPrompt(title);
            }

            console.log(`🎨 Generating ${theme} themed image for: ${title}`);
            console.log(`🔍 Using prompt: ${prompt.substring(0, 100)}...`);

            const response = await this.openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1792x1024", // Optimized for thumbnails
                quality: "hd",
                style: "vivid"
            });

            const imageUrl = response.data[0].url;
            console.log(`✅ ${theme} themed image generated successfully`);
            
            return {
                url: imageUrl,
                theme: theme,
                prompt: prompt
            };

        } catch (error) {
            console.error('❌ Themed image generation error:', error);
            return null;
        }
    }

    // Upload image to DigitalOcean Spaces
    async uploadImageToSpaces(imageUrl, title, category, theme) {
        try {
            console.log(`📤 Downloading themed image from DALL-E...`);
            const response = await fetch(imageUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to download image: ${response.statusText}`);
            }

            const imageBuffer = await response.buffer();
            
            // Create filename with theme information
            const timestamp = Date.now();
            const cleanTitle = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 50);
            
            const fileName = `${timestamp}-${cleanTitle}-${theme}.png`;
            const key = `${category}/${fileName}`;

            console.log(`📤 Uploading to DigitalOcean Spaces: ${key}`);

            const uploadParams = {
                Bucket: this.bucketName,
                Key: key,
                Body: imageBuffer,
                ACL: 'public-read',
                ContentType: 'image/png',
                Metadata: {
                    'theme': theme,
                    'generated-by': 'dall-e-3',
                    'optimized-for': 'thumbnails'
                }
            };

            const uploadResult = await this.s3.upload(uploadParams).promise();
            const cdnUrl = `https://${this.bucketName}.${process.env.SPACES_REGION}.cdn.digitaloceanspaces.com/${key}`;

            console.log(`✅ Themed image uploaded successfully: ${cdnUrl}`);
            
            return {
                success: true,
                url: cdnUrl,
                key: key,
                theme: theme,
                originalUrl: imageUrl
            };

        } catch (error) {
            console.error('❌ Image upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Complete themed image generation and upload process
    async generateAndUploadThemedImage(title, category) {
        try {
            // Generate themed DALL-E image
            const imageResult = await this.generateThemedImage(title, category);
            
            if (!imageResult) {
                console.log('⚠️ Failed to generate themed image');
                return { success: false, error: 'Image generation failed' };
            }

            // Upload to DigitalOcean Spaces
            const uploadResult = await this.uploadImageToSpaces(
                imageResult.url, 
                title, 
                category, 
                imageResult.theme
            );

            if (uploadResult.success) {
                return {
                    success: true,
                    featuredImage: uploadResult.url,
                    originalImageUrl: imageResult.url,
                    imageKey: uploadResult.key,
                    theme: imageResult.theme,
                    imageUploaded: true
                };
            } else {
                return {
                    success: false,
                    error: uploadResult.error
                };
            }

        } catch (error) {
            console.error('❌ Complete themed image process error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Test connection method
    async testConnection() {
        try {
            const params = {
                Bucket: this.bucketName
            };
            await this.s3.headBucket(params).promise();
            return {
                success: true,
                message: 'DigitalOcean Spaces connection successful',
                error: null,
                config: {
                    endpoint: process.env.SPACES_ENDPOINT,
                    bucket: this.bucketName,
                    region: process.env.SPACES_REGION
                }
            };
        } catch (error) {
            return {
                success: false,
                message: 'DigitalOcean Spaces connection failed',
                error: error.message
            };
        }
    }

    // List images in bucket
    async listImages(category = null) {
        try {
            const params = {
                Bucket: this.bucketName,
                Prefix: category ? `${category}/` : ''
            };

            const data = await this.s3.listObjectsV2(params).promise();
            
            const images = data.Contents.map(item => ({
                key: item.Key,
                url: `https://${this.bucketName}.${process.env.SPACES_REGION}.cdn.digitaloceanspaces.com/${item.Key}`,
                lastModified: item.LastModified,
                size: item.Size
            }));

            return {
                success: true,
                images: images
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = SpacesService;
