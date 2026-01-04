import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';
import { SEO, Container, Button, Card, Loading, SkeletonCard } from '../components';
import { useCategories, useProducts, useTestimonials } from '../hooks';
import { Star } from 'lucide-react';

export function Home() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <SEO
        title="BuildMate - Premium Construction Materials"
        description="High-quality construction materials including cement, bricks, steel, and tools. Fast delivery and competitive prices."
        keywords="construction materials, cement, bricks, steel, tools, supplies"
      />

      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 text-white pt-20 pb-16 md:pt-32 md:pb-24">
        <Container className="text-center">
          <h1 className="text-display-xl mb-4 leading-tight">
            Premium Construction <br /> Materials for Every Project
          </h1>
          <p className="text-lg md:text-xl text-secondary-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Trusted supplier of high-quality construction materials. Fast delivery, competitive prices, and professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="a" href="/catalog" variant="primary">
              Browse Catalog
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
            <a
              href="https://wa.me/55123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mb-12 text-center">
            <h2>Product Categories</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Explore our complete range of construction materials organized by category
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesLoading
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : categories.slice(0, 6).map((category) => (
                  <Link key={category.id} to={`/catalog?category=${category.slug}`}>
                    <Card hover className="overflow-hidden h-full">
                      <div className="w-full h-48 overflow-hidden bg-secondary-100">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">{category.name}</h3>
                        <p className="text-secondary-600 text-sm mb-4">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary-600">
                            {category.productCount} products
                          </span>
                          <ArrowRight size={18} className="text-primary-500" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-secondary-50">
        <Container>
          <div className="mb-12 text-center">
            <h2>Featured Products</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Check out our most popular and highly-rated construction materials
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {productsLoading
              ? Array(4)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : featuredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.slug}`}>
                    <Card hover className="overflow-hidden h-full flex flex-col">
                      <div className="w-full h-40 overflow-hidden bg-secondary-100">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <p className="text-xs font-semibold text-primary-600 uppercase mb-2">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-secondary-900 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-4 flex-grow">
                          {product.shortDescription}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                          <span className="text-xs font-semibold text-primary-600">Learn More</span>
                          <ArrowRight size={16} className="text-primary-500" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>

          <div className="text-center">
            <Button as="a" href="/catalog" variant="secondary">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-secondary-100 py-12 md:py-16">
        <Container>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">25+ Years</h3>
              <p className="text-secondary-700">Trusted supplier in the industry</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">500+ Clients</h3>
              <p className="text-secondary-700">Construction professionals and companies</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">300+ Products</h3>
              <p className="text-secondary-700">Complete range of materials</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mb-12 text-center">
            <h2>What Our Clients Say</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Read testimonials from satisfied construction professionals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsLoading
              ? Array(3)
                  .fill(null)
                  .map((_, i) => <SkeletonCard key={i} />)
              : testimonials.slice(0, 3).map((testimonial) => (
                  <Card key={testimonial.id} className="p-6 flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array(testimonial.rating)
                        .fill(null)
                        .map((_, i) => (
                          <Star key={i} size={16} className="fill-primary-500 text-primary-500" />
                        ))}
                    </div>
                    <p className="text-secondary-700 mb-4 flex-grow italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-secondary-200">
                      {testimonial.image && (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-bold text-secondary-900">{testimonial.name}</p>
                        <p className="text-sm text-secondary-600">{testimonial.company}</p>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary-500 text-secondary-900 py-12 md:py-16">
        <Container className="text-center">
          <h2 className="text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a quote or to discuss your construction material needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+55123456789" className="btn-secondary text-center">
              Call Us Now
            </a>
            <Link to="/contact" className="btn-outline text-center">
              Request a Quote
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
