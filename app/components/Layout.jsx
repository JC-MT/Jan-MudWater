import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header.menu} />
      <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
      <main>
        <video
          playsInline=""
          autoPlay={true}
          muted=""
          loop={true}
          className="video-container tw-z-0 tw-object-cover tw-w-full tw-h-full tw-absolute tw-inset-0 tw-hidden md:tw-block"
          x-ref="video"
        >
          <source
            type="video/mp4"
            src="https://cdn.shopify.com/s/files/1/0137/9434/5014/files/rise_video_desktop.mp4?v=1636602766"
          ></source>
        </video>
        <div className="text-overlay-container">
          <div className="text-overlay-container-item">
            <h1 className="text-overlay-container-item-title">
              Energy &amp; focus without the&nbsp;jitters
            </h1>
            <p className="text-overlay-container-item-paragraph">
              A coffee alternative consisting of 100% organic cacao, ayurvedic
              herbs and functional mushrooms. With just a fraction of the
              caffeine found in coffee, you get energy, focus and immune support
              without the jitters, crash or poor&nbsp;sleep.
            </p>
            <div>
              <div className="tryit">Try It</div>
              <div className="shipping">
                Free US shipping + comes with a free frother.
              </div>
            </div>
            <div class="reviews">
              <img
                src="https://heirloomkitchen.com/wp-content/uploads/2016/05/three-and-a-half-stars.png"
                alt=""
                height={28}
                width={100}
              />
              <span class="oke-sr-count-number">36,672 Reviews</span>
            </div>
            <div class="text-overlay-container-item-quote">
              <div class="tw-absolute tw-inset-0 tw-transition-opacity tw-duration-[.4s]">
                <div class="text-overlay-container-item-paragraph quote">
                  "MUD\WTR is pretty much the best substitute for coffee that
                  you can ultimately&nbsp;get."
                </div>
                <cite>
                  <div className="tag">@THOMASDELAUER</div>
                  <div class="tw-font-sans tw-text-[0.625rem] tw-tracking-[0.8px]">
                    Author and Fitness Coach
                  </div>
                </cite>
              </div>
            </div>
            <button className="coach-button">
              <img
                width={45}
                height={45}
                src="//mudwtr.com/cdn/shop/files/Screen_Shot_2019-09-26_at_1.50.05_PM_41x41_crop_center@2x.png?v=1614296653"
                alt=""
              />
            </button>
          </div>
        </div>
      </main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer.menu} />}
        </Await>
      </Suspense>
    </>
  );
}

function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({menu}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu menu={menu} viewport="mobile" />
    </Aside>
  );
}
