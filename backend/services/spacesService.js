// backend/services/spacesService.js - ASTROLOGY THEMED IMAGE GENERATION
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const OpenAI = require('openai');

class AstrologySpacesService {
    constructor() {
        this.spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
        this.s3 = new AWS.S3({
            endpoint: this.spacesEndpoint,
            accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
            secretAccessKey: process.env.DO_SPACES_SECRET_KEY,
            region: process.env.DO_SPACES_REGION,
            s3ForcePathStyle: false,
            signatureVersion: 'v4'
        });
        this.bucketName = process.env.DO_SPACES_BUCKET;
        
        // Initialize OpenAI for DALL-E
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    // Theme selection based on astrology content
    selectAstrologyTheme(title, category) {
        const titleLower = title.toLowerCase();
        
        // Cosmic/Daily themes = Mystical Cosmic (Deep Blue + Gold)
        if (titleLower.includes('cosmic') || titleLower.includes('daily') || 
            titleLower.includes('today') || titleLower.includes('stars') ||
            category.includes('daily') || category.includes('lucky')) {
            return 'mystical-cosmic';
        }
        
        // Love/Compatibility = Romantic Celestial (Pink + Purple)
        if (titleLower.includes('love') || titleLower.includes('compatibility') || 
            titleLower.includes('relationship') || titleLower.includes('romance') ||
            category.includes('love') || category.includes('compatibility')) {
            return 'romantic-celestial';
        }
        
        // Health/Gemstone/Ancient = Sacred Wisdom (Green + Gold)
        if (titleLower.includes('health') || titleLower.includes('gemstone') || 
            titleLower.includes('ancient') || titleLower.includes('wisdom') ||
            titleLower.includes('vedic') || titleLower.includes('healing') ||
            category.includes('health') || category.includes('gemstone')) {
            return 'sacred-wisdom';
        }
        
        // Career/Success/Timing = Royal Power (Purple + Gold)
        if (titleLower.includes('career') || titleLower.includes('success') || 
            titleLower.includes('timing') || titleLower.includes('muhurat') ||
            titleLower.includes('professional') || titleLower.includes('auspicious') ||
            category.includes('career') || category.includes('muhurat')) {
            return 'royal-power';
        }
        
        // Festival/Celebration = Divine Celebration (Orange + Red)
        if (titleLower.includes('festival') || titleLower.includes('celebration') || 
            titleLower.includes('diwali') || titleLower.includes('holi') ||
            category.includes('festival')) {
            return 'divine-celebration';
        }

        // Default based on category
        return category.includes('daily') ? 'mystical-cosmic' : 'sacred-wisdom';
    }

    // Extract zodiac sign or astrological element for more specific prompts
    extractAstrologyElement(title) {
        const zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
                            'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
                            'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'];
        
        const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu',
                        'सूर्य', 'चंद्र', 'मंगल', 'बुध', 'बृहस्पति', 'शुक्र', 'शनि', 'राहु', 'केतु'];
        
        const gemstones = ['ruby', 'pearl', 'coral', 'emerald', 'sapphire', 'diamond',
                          'माणिक', 'मोती', 'मूंगा', 'पन्ना', 'पुखराज', 'हीरा', 'नीलम'];
        
        const titleLower = title.toLowerCase();
        
        // Check for zodiac signs
        const foundZodiac = zodiacSigns.find(sign => titleLower.includes(sign.toLowerCase()));
        if (foundZodiac) return foundZodiac;
        
        // Check for planets
        const foundPlanet = planets.find(planet => titleLower.includes(planet.toLowerCase()));
        if (foundPlanet) return foundPlanet;
        
        // Check for gemstones
        const foundGemstone = gemstones.find(gem => titleLower.includes(gem.toLowerCase()));
        if (foundGemstone) return foundGemstone;
        
        return 'cosmic energy';
    }

    // Mystical Cosmic theme (Deep Blue + Gold for daily/cosmic content)
    getMysticalCosmicPrompt(title) {
        const astrologyElement = this.extractAstrologyElement(title);
        return `Create a mystical cosmic astrology thumbnail: deep space background with swirling galaxies in rich navy blue and midnight black, golden celestial symbols and constellations floating ethereally, ${astrologyElement} prominently featured with golden divine light radiating from center, sacred geometry patterns in gold, twinkling stars and cosmic dust, mystical aura with soft golden glow effects, spiritual and enchanting mood, ancient wisdom aesthetic with modern appeal, no text overlays, ultra-detailed cosmic imagery, professional astrology content style`;
    }

    // Romantic Celestial theme (Pink + Purple for love/compatibility)
    getRomanticCelestialPrompt(title) {
        const astrologyElement = this.extractAstrologyElement(title);
        return `Create a romantic celestial astrology thumbnail: soft gradient background from deep purple to rose pink, twin stars or celestial bodies representing connection, ${astrologyElement} surrounded by heart-shaped constellation patterns, gentle pink and purple nebula clouds, romantic cosmic elements like shooting stars, ethereal love energy flowing between celestial objects, dreamy and enchanting mood, soft glowing effects in pink and lavender, elegant and mystical romance theme, no text overlays, beautiful cosmic love story aesthetic`;
    }

    // Sacred Wisdom theme (Green + Gold for health/gemstones/ancient wisdom)
    getSacredWisdomPrompt(title) {
        const astrologyElement = this.extractAstrologyElement(title);
        return `Create a sacred wisdom astrology thumbnail: rich emerald green background with ancient temple or forest elements, ${astrologyElement} glowing with healing golden light, sacred Sanskrit symbols and Om signs floating in golden aura, natural healing elements like lotus flowers or sacred trees, gemstones radiating divine energy, wise and peaceful mood with healing vibrations, ancient Indian spiritual aesthetic, golden divine light beams, meditation and wellness theme, no text overlays, serene and powerful healing energy`;
    }

    // Royal Power theme (Purple + Gold for career/success/timing)
    getRoyalPowerPrompt(title) {
        const astrologyElement = this.extractAstrologyElement(title);
        return `Create a royal power astrology thumbnail: majestic deep purple background with golden palace or royal elements, ${astrologyElement} crowned with golden royal symbols, ancient Indian king's court aesthetic with golden pillars, powerful aura radiating success and authority, crown jewels and royal insignia floating in golden light, commanding and prestigious mood, luxury and power theme with royal purple and gold color scheme, ancient royal wisdom aesthetic, no text overlays, magnificent and authoritative energy`;
    }

    // Divine Celebration theme (Orange + Red for festivals)
    getDivineCelebrationPrompt(title) {
        const astrologyElement = this.extractAstrologyElement(title);
        return `Create a divine celebration astrology thumbnail: vibrant festival background with warm orange and red gradients, ${astrologyElement} surrounded by festival lights and diyas, Indian festival elements like marigold flowers and rangoli patterns, celebratory fireworks in cosmic sky, divine temple bells and festive decorations, joyful and auspicious mood with golden divine blessings, traditional Indian celebration aesthetic, warm glowing effects in saffron and red, spiritual festival energy, no text overlays, blessed and auspicious celebration theme`;
    }

    // Generate themed DALL-E image
    async generateThemedImage(title, category) {
        try {
            const theme = this.selectAstrologyTheme(title, category);
            let prompt;

            switch (theme) {
                case 'mystical-cosmic':
                    prompt = this.getMysticalCosmicPrompt(title);
                    break;
                case 'romantic-celestial':
                    prompt = this.getRomanticCelestialPrompt(title);
                    break;
                case 'sacred-wisdom':
                    prompt = this.getSacredWisdomPrompt(title);
                    break;
                case 'royal-power':
                    prompt = this.getRoyalPowerPrompt(title);
                    break;
                case 'divine-celebration':
                    prompt = this.getDivineCelebrationPrompt(title);
                    break;
                default:
                    prompt = this.getSacredWisdomPrompt(title);
            }

            console.log(`🎨 Generating ${theme} astrology image for: ${title}`);
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
            console.log(`✅ ${theme} astrology image generated successfully`);
            
            return {
                url: imageUrl,
                theme: theme,
                prompt: prompt
            };

        } catch (error) {
            console.error('❌ Astrology image generation error:', error);
            return null;
        }
    }

    // Upload image to DigitalOcean Spaces
    async uploadImageToSpaces(imageUrl, title, category, theme) {
        try {
            console.log(`📤 Downloading astrology image from DALL-E...`);
            const response = await fetch(imageUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to download image: ${response.statusText}`);
            }

            const imageBuffer = await response.buffer();
            
            // Create filename with astrology theme information
            const timestamp = Date.now();
            const cleanTitle = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 50);
            
            const fileName = `${timestamp}-${cleanTitle}-${theme}.png`;
            const key = `astrology/${category}/${fileName}`;

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
                    'optimized-for': 'astrology-thumbnails',
                    'platform': 'astrology-ai'
                }
            };

            const uploadResult = await this.s3.upload(uploadParams).promise();
            const cdnUrl = `https://${this.bucketName}.${process.env.DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${key}`;

            console.log(`✅ Astrology image uploaded successfully: ${cdnUrl}`);
            
            return {
                success: true,
                url: cdnUrl,
                key: key,
                theme: theme,
                originalUrl: imageUrl
            };

        } catch (error) {
            console.error('❌ Astrology image upload error:', error);
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
                console.log('⚠️ Failed to generate astrology image');
                return { success: false, error: 'Astrology image generation failed' };
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
            console.error('❌ Complete astrology image process error:', error);
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
                message: 'DigitalOcean Spaces connection successful - Astrology Platform',
                error: null,
                config: {
                    endpoint: process.env.DO_SPACES_ENDPOINT,
                    bucket: this.bucketName,
                    region: process.env.DO_SPACES_REGION
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

    // List astrology images in bucket
    async listImages(category = null) {
        try {
            const params = {
                Bucket: this.bucketName,
                Prefix: category ? `astrology/${category}/` : 'astrology/'
            };

            const data = await this.s3.listObjectsV2(params).promise();
            
            const images = data.Contents.map(item => ({
                key: item.Key,
                url: `https://${this.bucketName}.${process.env.DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${item.Key}`,
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

module.exports = AstrologySpacesService;
