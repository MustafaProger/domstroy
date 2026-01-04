import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { SEO, Container, Card, Button, Loading, SkeletonCard } from '../components';
import { useCategories, useProducts } from '../hooks';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === categories.find((c) => c.slug === selectedCategory)?.name);
  }, [products, categories, selectedCategory]);

  const handleCategoryChange = (slug: string) => {
    if (slug === selectedCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <>
      <SEO
        title="Каталог продукции - ДомСтрой"
        description="Просмотрите наш полный каталог строительных материалов, включая цемент, кирпич, сталь и инструменты."
        keywords="строительные материалы, товары, каталог"
      />

      <section className="bg-secondary-50 border-b border-secondary-200 py-8 md:py-12">
        <Container>
          <div className="flex items-center gap-2 mb-4 text-sm text-secondary-600">
            <Link to="/" className="hover:text-primary-500">
              Главная
            </Link>
            <span>/</span>
            <span>Каталог</span>
          </div>
          <h1>Каталог продукции</h1>
          <p className="text-secondary-600 mt-2 max-w-xl">
            Изучите наш полный ассортимент высококачественных строительных материалов
          </p>
        </Container>
      </section>

      <div className="section-padding">
        <Container>
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <button
                className="lg:hidden w-full flex items-center gap-2 px-4 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 mb-4 font-semibold"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              >
                <Filter size={20} />
                Фильтры
              </button>

              <div className={`space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-secondary-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">Категории</h3>

                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-500 text-secondary-900 font-semibold'
                        : 'text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    Все категории
                  </button>

                  {categoriesLoading ? (
                    <div className="space-y-2 mt-3">
                      {Array(4)
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} className="h-8 bg-secondary-200 rounded animate-pulse"></div>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-2 mt-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.slug)}
                          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.slug
                              ? 'bg-primary-500 text-secondary-900 font-semibold'
                              : 'text-secondary-700 hover:bg-secondary-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <span className="text-xs font-semibold opacity-75">
                              ({category.productCount})
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-3">Нужна помощь?</h3>
                  <p className="text-secondary-600 text-sm mb-4">
                    Не можете найти то, что ищете? Свяжитесь с нашей командой для персональных рекомендаций.
                  </p>
                  <a href="https://wa.me/55123456789" target="_blank" rel="noopener noreferrer">
                    <Button fullWidth variant="secondary" size="sm">
                      Написать в WhatsApp
                    </Button>
                  </a>
                </Card>
              </div>
            </aside>

            <main className="lg:col-span-3">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">
                    {selectedCategory
                      ? categories.find((c) => c.slug === selectedCategory)?.name || 'Товары'
                      : 'Все товары'}
                  </h2>
                  <p className="text-secondary-600 mt-1">
                    Показано {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length > 1 && filteredProducts.length < 5 ? 'товара' : 'товаров'}
                  </p>
                </div>
              </div>

              {productsLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.slug}`}>
                      <Card hover className="overflow-hidden h-full flex flex-col">
                        <div className="w-full h-48 overflow-hidden bg-secondary-100">
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
                          <p className="text-sm text-secondary-600 mb-4 flex-grow line-clamp-3">
                            {product.shortDescription}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                            {product.inStock ? (
                              <span className="text-xs font-semibold text-green-600">В наличии</span>
                            ) : (
                              <span className="text-xs font-semibold text-accent-600">Нет в наличии</span>
                            )}
                            <ArrowRight size={16} className="text-primary-500" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-secondary-600 text-lg mb-4">Товары в этой категории не найдены</p>
                  <Button variant="secondary" onClick={() => handleCategoryChange('')}>
                    Посмотреть все товары
                  </Button>
                </Card>
              )}
            </main>
          </div>
        </Container>
      </div>
    </>
  );
}
