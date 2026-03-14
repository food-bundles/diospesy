"use client";

import RSVPForm from "@/components/RSVPForm";

export default function Page() {
  const heroImage = "/image.jpg";

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <img className="hero-img" src={heroImage} alt="Wedding celebration" />
        <div className="hero-overlay"></div>
        <div className="hero-topbar"></div>
        <div className="hero-inner">
          <p className="h-tag">
            Together with their families — you are warmly invited to celebrate
          </p>
          <h1 className="h-names">
            Dioscore<span className="h-amp">&</span>Specy
          </h1>
          <p className="h-story">15 years of friendship — a lifetime of love</p>
          <p className="h-date">14 · June · 2026</p>
          <p className="h-loc">Alexandria, Egypt</p>
          <div className="h-orn">
            <span>✦</span>
          </div>
          <p className="h-cta">
            Discover the celebrations & confirm your attendance
          </p>
          <span className="h-arrow"></span>
        </div>
      </section>

      {/* BANNER */}
      <div className="banner">
        ⏲ Please confirm your attendance — response needed within{" "}
        <strong>15</strong> days ⏲
      </div>

      {/* STORY */}
      <section style={{ background: "#faf6ef" }}>
        <div className="sec" style={{ maxWidth: "800px" }}>
          <p className="sec-label">Our Story</p>
          <h2 className="sec-title">
            Dioscore SHIKAMA <em>&</em> Specy M. NJISHI
          </h2>
          <p className="body-p">
            What began as a friendship 15 years ago has grown into an
            unbreakable bond — a partnership built on laughter, loyalty, and an
            unwavering love for each other. Dioscore and Specy walked through
            life's every chapter side by side, until one day they realised that
            the person they had been looking for had been beside them all along.
          </p>
          <p className="body-p">
            On <strong>14 June 2026</strong>, they will exchange their vows in
            Alexandria, Egypt — the ancient "Bride of the Mediterranean" — a
            city as timeless as their love story. We invite you to join us
            across three extraordinary days of celebration.
          </p>
        </div>
      </section>

      <hr className="hr-gold" />

      {/* FACTS */}
      <section className="facts-bg">
        <div className="sec">
          <p className="sec-label lt">About Alexandria</p>
          <h2 className="sec-title lt">
            Your destination — <em>Alexandria</em>
          </h2>
          <p className="body-p lt">
            Founded around 331 BC by Alexander the Great, Alexandria has been a
            crossroads of civilisations for over 2,300 years — Greek, Roman,
            Arab, Ottoman, and Mediterranean cultures all woven into one
            extraordinary city on Egypt's northern coast.
          </p>
          <div className="facts-grid">
            <div className="fact">
              <div className="fact-icon">🌊</div>
              <div className="fact-title">Bride of the Mediterranean</div>
              <div className="fact-body">
                Locals call Alexandria "Arousat al-Bahr al-Abyad". It stretches
                40 km along the sea and is the largest city on the entire
                Mediterranean coast.
              </div>
            </div>
            <div className="fact">
              <div className="fact-icon">📚</div>
              <div className="fact-title">The Great Library</div>
              <div className="fact-body">
                Alexandria once housed the greatest library of the ancient
                world. The modern Bibliotheca Alexandrina stands on that very
                same legendary site today.
              </div>
            </div>
            <div className="fact">
              <div className="fact-icon">🏛</div>
              <div className="fact-title">Seven Wonders</div>
              <div className="fact-body">
                The Lighthouse of Alexandria (Pharos) was one of the Seven
                Wonders of the Ancient World — guiding sailors across the
                Mediterranean for centuries.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME HEADER */}
      <div className="prog-hdr">
        <p
          style={{
            fontFamily: "'Cinzel','Palatino Linotype',serif",
            fontSize: "0.62rem",
            letterSpacing: "0.44em",
            color: "#c9a96e",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Full Programme · June 2026
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond','Georgia',serif",
            fontSize: "clamp(2rem,5vw,2.8rem)",
            fontWeight: "300",
            color: "#fff",
            lineHeight: "1.2",
          }}
        >
          Three Days of{" "}
          <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Celebration</em>
        </h2>
        <div className="prog-hdr-line"></div>
        <p className="prog-intro">
          From the waters of Behry Square to the stones of a 176-year-old
          cathedral, and onward to an open-air reception under the warm
          Alexandria sky.
        </p>
      </div>

      {/* DAY 1 */}
      <div className="day-section">
        <div className="day-inner">
          <div className="day-hdr">
            <div className="day-num">
              <div className="day-num-big">13</div>
              <div className="day-num-mo">June</div>
            </div>
            <div className="day-hdr-line"></div>
            <div className="day-hdr-label">Saturday — Eve of the Wedding</div>
          </div>
          <div className="ev-card">
            <div className="ev-bar"></div>
            <div>
              <div className="ev-row">
                <h3 className="ev-name">Cultural Evening aboard a Yacht</h3>
                <span className="ev-time">18:00 — 23:00</span>
              </div>
              <p className="ev-place">📍 Behry Square, Alexandria</p>
              <p className="ev-desc">
                An intimate evening on the sparkling waters of Alexandria — live
                music, cultural moments, and the warm glow of the Mediterranean
                at dusk. Gather with family and close friends aboard the yacht
                as we celebrate the eve of the wedding, with the city's iconic
                corniche glittering around us and the sea breeze carrying the
                joy of what lies ahead.
              </p>
              <div className="ev-tags">
                <span className="ev-tag">Smart Casual Attire</span>
                <span className="ev-tag">Drinks & Light Bites</span>
                <span className="ev-tag">Pre-Wedding · Evening</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 2 */}
      <div className="day-section alt">
        <div className="day-inner">
          <div className="day-hdr">
            <div className="day-num">
              <div className="day-num-big">14</div>
              <div className="day-num-mo">June</div>
            </div>
            <div className="day-hdr-line"></div>
            <div className="day-hdr-label">Sunday — Wedding Day</div>
          </div>

          {/* Ceremony */}
          <div className="ev-card">
            <div className="ev-bar"></div>
            <div>
              <div className="ev-row">
                <h3 className="ev-name">Catholic Religious Ceremony</h3>
                <span className="ev-time">14:00 — 15:30</span>
              </div>
              <p className="ev-place">
                📍 Saint Catherine Cathedral — Al Mancheya, Alexandria
              </p>
              <p className="ev-desc">
                A sacred Catholic ceremony uniting Dioscore and Specy before God
                and their loved ones. Saint Catherine Cathedral is a magnificent
                Neo-Baroque masterpiece constructed between 1847 and 1856 — by
                the time our vows are exchanged within its walls, this
                extraordinary cathedral will have stood for{" "}
                <strong style={{ color: "#c9a96e" }}>176 years</strong>.
              </p>
              <div className="ev-info">
                <div className="ev-info-title">Practical Notes</div>
                <div className="ev-info-body">
                  - Please be seated by{" "}
                  <strong style={{ color: "rgba(255,255,255,.65)" }}>
                    13:45
                  </strong>
                  <br />
                  - Shoulders and knees should be covered inside the cathedral
                  <br />- Photography welcome — please be discreet during the
                  ceremony
                </div>
              </div>
              <div className="ev-tags">
                <span className="ev-tag">Formal Attire</span>
                <span className="ev-tag">Arrive by 13:45</span>
                <span className="ev-tag">176 Years of History</span>
              </div>
            </div>
          </div>

          <div className="connector">
            <div className="connector-line"></div>
            <span className="connector-label">Followed by</span>
          </div>

          {/* Reception */}
          <div className="ev-card">
            <div className="ev-bar"></div>
            <div>
              <div className="ev-row">
                <h3 className="ev-name">Wedding Reception</h3>
                <span className="ev-time">16:00 — Late</span>
              </div>
              <p className="ev-place">
                📍 Sunrise Alex Avenue Hotel — Sea Bite, Open Air · 29 Al-Fallah
                Street, Alexandria
              </p>
              <p className="ev-desc">
                The main celebration — a full sit-down dinner, live DJ, and
                dancing at the stunning Sea Bite open-air venue. With the warm
                Mediterranean breeze, the lights of Alexandria all around you,
                and the people we love most gathered together, this evening is
                set to be truly unforgettable.
              </p>
              <div className="ev-info">
                <div className="ev-info-title">What to Expect</div>
                <div className="ev-info-body">
                  - Full dinner — Lebanese salads, herb-marinated grills,
                  dessert buffet
                  <br />
                  - Live DJ & dance floor
                  <br />
                  - Soft drinks included · Additional beverages available
                  <br />- Professional photography throughout the evening
                </div>
              </div>
              <div className="ev-tags">
                <span className="ev-tag">Cocktail / Evening Wear</span>
                <span className="ev-tag">Open Air Venue</span>
                <span className="ev-tag">Dinner & Dancing</span>
              </div>
            </div>
          </div>

          <div className="connector">
            <div className="connector-line"></div>
            <span className="connector-label">Continuing into the night</span>
          </div>

          {/* After Party */}
          <div className="ev-card" style={{ marginBottom: 0 }}>
            <div
              className="ev-bar"
              style={{
                background:
                  "linear-gradient(to bottom,rgba(201,169,110,.5),rgba(201,169,110,.05))",
              }}
            ></div>
            <div>
              <div className="ev-row">
                <h3 className="ev-name">After Party</h3>
                <span className="ev-time">Late Night</span>
              </div>
              <p className="ev-place">
                📍 Sunrise Alex Avenue Hotel, Alexandria
              </p>
              <p className="ev-desc">
                For those not yet ready to let the night end — the celebration
                continues with more music, more dancing, and more joy deep into
                the Alexandria night. Full details will be shared with confirmed
                guests closer to the date.
              </p>
              <div className="ev-tags">
                <span className="ev-tag">After Party</span>
                <span className="ev-tag">Details TBC</span>
                <span className="ev-tag">Confirmed Guests Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DRESS CODE BAR */}
      <div className="dress-bar">
        <div className="dress-inner">
          <div className="dress-title">Dress Code at a Glance</div>
          <div className="dress-grid">
            <div className="dress-item">
              <div className="dress-icon">🎩</div>
              <div className="dress-event">Yacht Evening</div>
              <div className="dress-code">Smart Casual</div>
            </div>
            <div className="dress-item">
              <div className="dress-icon">👔</div>
              <div className="dress-event">Cathedral Ceremony</div>
              <div className="dress-code">Formal / Sunday Best</div>
            </div>
            <div className="dress-item">
              <div className="dress-icon">🍾</div>
              <div className="dress-event">Reception</div>
              <div className="dress-code">Cocktail / Evening Wear</div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP FORM */}
      <RSVPForm />

      {/* CONTACT */}
      <div className="contact-bg">
        <div className="contact-label">Questions?</div>
        <div className="contact-row">
          <div>
            <div className="c-name">Dioscore</div>
            <div className="c-det">
              <a href="mailto:doresdios@gmail.com">doresdios@gmail.com</a>
            </div>
          </div>
          <div className="c-sep"></div>
          <div>
            <div className="c-name">Specy</div>
            <div className="c-det">
              <a href="mailto:specymukanjishi@gmail.com">
                specymukanjishi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span className="f-names">Dioscore & Specy</span>
        14 June 2026 · Alexandria, Egypt
        <br />
        15 years of friendship, a lifetime of love
      </footer>
    </main>
  );
}
