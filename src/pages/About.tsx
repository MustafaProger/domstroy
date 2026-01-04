import { Link } from 'react-router-dom';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';
import { SEO, Container, Button, Card } from '../components';
import { companyInfo } from '../data/products';

export function About() {
  return (
    <>
      <SEO
        title="About BuildMate - Construction Materials Supplier"
        description="Learn about BuildMate, a trusted supplier of premium construction materials for over 25 years."
        keywords="about us, construction materials, supplier, company"
      />

      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 md:py-24">
        <Container className="text-center">
          <h1 className="text-display-xl mb-4">About BuildMate</h1>
          <p className="text-xl text-secondary-200 max-w-2xl mx-auto">
            Your trusted partner for premium construction materials since 1995
          </p>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4">Our Story</h2>
              <p className="text-secondary-700 mb-4 leading-relaxed">
                Founded in 1995, BuildMate started with a simple mission: to provide high-quality construction materials at fair prices. What began as a small operation has grown into one of the region's most trusted suppliers for construction professionals.
              </p>
              <p className="text-secondary-700 mb-4 leading-relaxed">
                Over {new Date().getFullYear() - companyInfo.foundedYear} years, we've built lasting relationships with contractors, construction companies, and individual builders. Our commitment to quality, reliability, and exceptional customer service has made us the preferred choice for thousands of projects.
              </p>
              <p className="text-secondary-700 leading-relaxed">
                Today, we operate a modern facility stocked with over 300 construction products, backed by a team of knowledgeable professionals dedicated to your success.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg"
                alt="BuildMate facility"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary-50 py-12 md:py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2>Why Choose BuildMate</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              We're committed to your project's success with quality materials and professional service
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-secondary-600 text-sm">
                All products meet international standards and undergo strict quality control
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Expert Support</h3>
              <p className="text-secondary-600 text-sm">
                Our team provides professional guidance for your material selection
              </p>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Competitive Prices</h3>
              <p className="text-secondary-600 text-sm">
                Best prices in the market without compromising on quality
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Reliability</h3>
              <p className="text-secondary-600 text-sm">
                Fast delivery and consistent service you can count on
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mb-12 text-center">
            <h2>Our Milestones</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Key achievements in our journey as a construction materials supplier
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">1995</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Founded</h3>
                <p className="text-secondary-600">BuildMate opens its first location with a small selection of materials</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2005</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Expansion</h3>
                <p className="text-secondary-600">Opened modern distribution center and expanded product range to 300+ items</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2015</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Digital Transformation</h3>
                <p className="text-secondary-600">Launched online ordering system and mobile app for customer convenience</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2024</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Continued Growth</h3>
                <p className="text-secondary-600">Serving 500+ clients with over 300 products and expanding inventory</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-secondary-100 py-12 md:py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2>Leadership</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Meet the team behind BuildMate
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👨‍💼</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">João Silva</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Founder & CEO</p>
                <p className="text-secondary-600 text-sm">
                  30+ years of experience in construction materials with a passion for quality and customer satisfaction.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👩‍💼</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Maria Santos</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Operations Manager</p>
                <p className="text-secondary-600 text-sm">
                  Ensures smooth operations and inventory management with attention to detail and efficiency.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👨‍💻</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Carlos Oliveira</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Sales Manager</p>
                <p className="text-secondary-600 text-sm">
                  Builds strong relationships with clients and ensures their material needs are met perfectly.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-primary-500 text-secondary-900 py-12 md:py-16">
        <Container className="text-center">
          <h2 className="text-white mb-4">Join Our Community</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a small contractor or a large construction company, BuildMate is here to support your projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="btn-secondary text-center">
              Browse Our Catalog
            </Link>
            <Link to="/contact" className="btn-outline text-center">
              Get in Touch
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
