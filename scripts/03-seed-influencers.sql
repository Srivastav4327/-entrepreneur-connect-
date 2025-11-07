-- Seed influencer data with diverse profiles
INSERT INTO influencers (
  name, username, email, bio, profile_image_url, category_id,
  instagram_followers, instagram_engagement_rate, instagram_handle,
  tiktok_followers, tiktok_engagement_rate, tiktok_handle,
  youtube_subscribers, youtube_engagement_rate, youtube_handle,
  twitter_followers, twitter_engagement_rate, twitter_handle,
  age, gender, location, country,
  avg_views, avg_likes, avg_comments,
  brand_safety_score, authenticity_score,
  post_rate, story_rate, video_rate,
  is_verified, is_active
) VALUES
-- Fashion Influencers
('Sophia Chen', 'sophiastyle', 'sophia@example.com', 'Fashion enthusiast sharing daily outfit inspiration and style tips', '/placeholder.svg?height=400&width=400', 1,
 850000, 4.2, '@sophiastyle', 1200000, 6.8, '@sophiastyle', 450000, 3.1, 'SophiaStyleTV', 125000, 2.8, '@sophiastyle',
 26, 'Female', 'Los Angeles, CA', 'USA', 180000, 7500, 320, 9.2, 8.8, 2500.00, 800.00, 4000.00, true, true),

('Marcus Johnson', 'marcusfashion', 'marcus@example.com', 'Menswear expert and sustainable fashion advocate', '/placeholder.svg?height=400&width=400', 1,
 620000, 3.8, '@marcusfashion', 890000, 5.4, '@marcusfashion', 280000, 2.9, 'MarcusFashionTV', 95000, 2.1, '@marcusfashion',
 29, 'Male', 'New York, NY', 'USA', 145000, 5500, 280, 9.5, 9.1, 1800.00, 600.00, 3200.00, true, true),

-- Beauty Influencers
('Isabella Rodriguez', 'bellabeauty', 'isabella@example.com', 'Makeup artist and beauty reviewer with a passion for cruelty-free products', '/placeholder.svg?height=400&width=400', 2,
 1200000, 5.1, '@bellabeauty', 2100000, 7.2, '@bellabeauty', 680000, 4.3, 'BellaBeautyOfficial', 180000, 3.2, '@bellabeauty',
 24, 'Female', 'Miami, FL', 'USA', 220000, 11200, 450, 8.9, 9.3, 3200.00, 1000.00, 5500.00, true, true),

('Aisha Patel', 'aishaskincare', 'aisha@example.com', 'Skincare specialist focusing on natural and organic beauty solutions', '/placeholder.svg?height=400&width=400', 2,
 480000, 4.7, '@aishaskincare', 650000, 6.1, '@aishaskincare', 320000, 3.8, 'AishaSkincareTips', 85000, 2.9, '@aishaskincare',
 27, 'Female', 'Toronto, ON', 'Canada', 95000, 4500, 180, 9.4, 9.0, 1500.00, 500.00, 2800.00, false, true),

-- Fitness Influencers
('Jake Thompson', 'jakefitness', 'jake@example.com', 'Personal trainer helping people achieve their fitness goals through sustainable workouts', '/placeholder.svg?height=400&width=400', 3,
 920000, 4.5, '@jakefitness', 1500000, 6.9, '@jakefitness', 580000, 3.7, 'JakeFitnessTV', 140000, 2.5, '@jakefitness',
 31, 'Male', 'Austin, TX', 'USA', 165000, 7400, 290, 9.1, 8.7, 2200.00, 700.00, 3800.00, true, true),

('Priya Sharma', 'priyayoga', 'priya@example.com', 'Yoga instructor and wellness coach promoting mindful living and mental health', '/placeholder.svg?height=400&width=400', 3,
 680000, 4.9, '@priyayoga', 890000, 5.8, '@priyayoga', 420000, 4.1, 'PriyaYogaFlow', 110000, 3.1, '@priyayoga',
 28, 'Female', 'Vancouver, BC', 'Canada', 125000, 6200, 240, 9.6, 9.2, 1800.00, 600.00, 3200.00, true, true),

-- Food Influencers
('Chef Antonio', 'chefantonio', 'antonio@example.com', 'Professional chef sharing authentic Italian recipes and cooking techniques', '/placeholder.svg?height=400&width=400', 4,
 750000, 4.3, '@chefantonio', 1100000, 6.2, '@chefantonio', 890000, 4.8, 'ChefAntonioTV', 95000, 2.7, '@chefantonio',
 35, 'Male', 'San Francisco, CA', 'USA', 185000, 8000, 350, 9.3, 8.9, 2000.00, 650.00, 4200.00, true, true),

('Emma Wilson', 'emmaeats', 'emma@example.com', 'Food blogger exploring global cuisines and sharing easy weeknight dinner recipes', '/placeholder.svg?height=400&width=400', 4,
 540000, 4.6, '@emmaeats', 720000, 5.9, '@emmaeats', 380000, 3.9, 'EmmaEatsWorld', 75000, 2.8, '@emmaeats',
 26, 'Female', 'Portland, OR', 'USA', 110000, 5100, 210, 9.0, 8.8, 1600.00, 520.00, 2900.00, false, true),

-- Travel Influencers
('Alex Adventure', 'alexadventure', 'alex@example.com', 'Adventure traveler documenting off-the-beaten-path destinations and outdoor activities', '/placeholder.svg?height=400&width=400', 5,
 1100000, 4.8, '@alexadventure', 1800000, 7.1, '@alexadventure', 650000, 4.2, 'AlexAdventureTV', 160000, 3.0, '@alexadventure',
 29, 'Non-binary', 'Denver, CO', 'USA', 195000, 9200, 380, 8.8, 9.1, 2800.00, 900.00, 4800.00, true, true),

('Luna Martinez', 'lunatravels', 'luna@example.com', 'Luxury travel blogger showcasing boutique hotels and cultural experiences worldwide', '/placeholder.svg?height=400&width=400', 5,
 820000, 4.4, '@lunatravels', 950000, 5.7, '@lunatravels', 480000, 3.6, 'LunaTravelsWorld', 120000, 2.9, '@lunatravels',
 32, 'Female', 'Barcelona', 'Spain', 150000, 6600, 270, 9.2, 8.6, 2400.00, 800.00, 4000.00, true, true),

-- Tech Influencers
('David Kim', 'techwithdavid', 'david@example.com', 'Tech reviewer covering the latest gadgets, smartphones, and emerging technologies', '/placeholder.svg?height=400&width=400', 6,
 680000, 3.9, '@techwithdavid', 1200000, 6.4, '@techwithdavid', 920000, 4.5, 'TechWithDavidTV', 180000, 3.3, '@techwithdavid',
 27, 'Male', 'Seattle, WA', 'USA', 175000, 6800, 320, 9.4, 9.0, 2100.00, 700.00, 3600.00, true, true),

-- Gaming Influencers
('StreamerSarah', 'streamersarah', 'sarah@example.com', 'Professional gamer and Twitch streamer specializing in competitive FPS games', '/placeholder.svg?height=400&width=400', 7,
 590000, 5.2, '@streamersarah', 1400000, 7.8, '@streamersarah', 780000, 4.7, 'StreamerSarahTV', 220000, 3.8, '@streamersarah',
 23, 'Female', 'Chicago, IL', 'USA', 205000, 10600, 420, 8.7, 9.2, 1900.00, 600.00, 3400.00, true, true),

-- Lifestyle Influencers
('Maya Johnson', 'mayalifestyle', 'maya@example.com', 'Lifestyle blogger sharing daily routines, self-care tips, and positive mindset content', '/placeholder.svg?height=400&width=400', 8,
 720000, 4.7, '@mayalifestyle', 980000, 6.0, '@mayalifestyle', 420000, 3.8, 'MayaLifestyleTV', 95000, 2.6, '@mayalifestyle',
 25, 'Female', 'Nashville, TN', 'USA', 135000, 6400, 250, 9.1, 8.9, 1700.00, 550.00, 3100.00, false, true),

-- Business Influencers
('Robert Chen', 'robertbiz', 'robert@example.com', 'Entrepreneur and business coach helping startups scale and succeed', '/placeholder.svg?height=400&width=400', 9,
 450000, 3.6, '@robertbiz', 620000, 4.8, '@robertbiz', 580000, 4.2, 'RobertBizTV', 150000, 3.5, '@robertbiz',
 34, 'Male', 'San Jose, CA', 'USA', 98000, 3600, 180, 9.5, 9.3, 2500.00, 800.00, 4500.00, true, true),

-- Art & Design Influencers
('Zoe Creative', 'zoecreative', 'zoe@example.com', 'Digital artist and graphic designer sharing creative processes and design tutorials', '/placeholder.svg?height=400&width=400', 10,
 380000, 5.1, '@zoecreative', 850000, 6.7, '@zoecreative', 290000, 4.0, 'ZoeCreativeTV', 65000, 2.9, '@zoecreative',
 26, 'Female', 'Brooklyn, NY', 'USA', 85000, 4300, 170, 8.9, 9.1, 1400.00, 450.00, 2600.00, false, true);
