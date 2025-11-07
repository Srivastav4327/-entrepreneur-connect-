-- Seed categories/niches
INSERT INTO categories (name, description) VALUES
('Fashion & Style', 'Fashion influencers, style bloggers, and clothing brands'),
('Beauty & Skincare', 'Makeup artists, skincare enthusiasts, and beauty reviewers'),
('Fitness & Health', 'Personal trainers, nutritionists, and wellness advocates'),
('Food & Cooking', 'Chefs, food bloggers, and culinary enthusiasts'),
('Travel & Adventure', 'Travel bloggers, adventure seekers, and destination showcases'),
('Technology', 'Tech reviewers, gadget enthusiasts, and software developers'),
('Gaming', 'Gamers, streamers, and esports personalities'),
('Lifestyle', 'General lifestyle content, daily vlogs, and personal brands'),
('Business & Finance', 'Entrepreneurs, financial advisors, and business coaches'),
('Art & Design', 'Artists, designers, and creative professionals'),
('Music & Entertainment', 'Musicians, entertainers, and music reviewers'),
('Parenting & Family', 'Parent bloggers, family content, and child-focused brands'),
('Home & Decor', 'Interior designers, home improvement, and decor enthusiasts'),
('Pets & Animals', 'Pet owners, veterinarians, and animal lovers'),
('Education', 'Teachers, educational content creators, and learning platforms')
ON CONFLICT (name) DO NOTHING;
