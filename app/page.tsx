"use client";

import RSVPForm from "@/components/RSVPForm";

export default function Page() {
  const heroImage = "/image.jpg";

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] md:object-[center_40%]"
          src={heroImage}
          alt="Wedding celebration"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/40 to-black/60" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-w-accent to-transparent" />

        <div className="relative z-10 max-w-[740px] px-8 pb-16 pt-8">
          <p className="font-[Cinzel,serif] text-[0.62rem] tracking-[0.42em] text-white/75 uppercase mb-[1.6rem] opacity-90 animate-[fadeUp_0.9s_ease_0.2s_both]">
            Together with our families — you are warmly invited to celebrate
          </p>
          <h1 className="font-['Great_Vibes',cursive] text-[clamp(3.8rem,11vw,7rem)] font-normal text-white leading-[1.05] tracking-[0.01em] animate-[fadeUp_0.9s_ease_0.4s_both]">
            Dioscore<span className="text-w-accent mx-[0.08em]">&</span>Specy
          </h1>
          <p className="font-['Great_Vibes',cursive] text-[clamp(1.3rem,3vw,1.7rem)] text-white/75 mt-[0.6rem] animate-[fadeUp_0.9s_ease_0.55s_both]">
            15 years of friendship — a lifetime of love
          </p>
          <p className="font-[Cinzel,serif] text-[clamp(0.78rem,1.8vw,0.92rem)] tracking-[0.24em] text-w-300 mt-[1.6rem] animate-[fadeUp_0.9s_ease_0.7s_both]">
            14 · June · 2026
          </p>
          <p className="font-[Cormorant_Garamond,serif] italic text-[1.05rem] text-white/50 mt-[0.3rem] animate-[fadeUp_0.9s_ease_0.8s_both]">
            Alexandria, Egypt
          </p>
          <div className="flex items-center gap-[0.9rem] my-[1.8rem] mx-auto max-w-[220px] animate-[fadeIn_0.9s_ease_0.95s_both] before:content-[''] before:flex-1 before:h-px before:bg-gradient-to-r before:from-transparent before:to-w-700 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-w-700 after:to-transparent">
            <span className="text-w-accent text-[0.85rem]">✦</span>
          </div>
          <p className="font-[Cinzel,serif] text-[0.6rem] tracking-[0.3em] text-white/75 uppercase animate-[fadeIn_0.9s_ease_1.1s_both]">
            Discover the celebrations & confirm your attendance
          </p>
          <span className="block w-px h-8 bg-gradient-to-b from-w-700 to-transparent mx-auto mt-[0.7rem]" />
          <div className="mt-8 mx-auto w-[60%] rounded-full bg-gradient-to-r from-w-800 via-w-accent to-w-800 text-dark-bg text-center py-2 px-6 font-[Cinzel,serif] text-[0.72rem] tracking-[0.2em] uppercase">
            ⏲ Please confirm within 15 days ⏲
          </div>
        </div>
      </section>

      {/* BANNER */}

      {/* STORY */}
      <section className="bg-w-50 ">
        <div className="max-w-[800px] mx-auto py-8 px-8 ">
          <p className="font-[Cinzel,serif] text-[0.6rem] tracking-[0.42em] text-w-700 uppercase mb-3 flex items-center gap-3 after:content-['']  after:h-px after:bg-w-700 after:opacity-45">
            Our Story
          </p>
          <h2 className="font-[Cormorant_Garamond,serif] text-[clamp(1.8rem,4.5vw,2.7rem)] font-light leading-[1.2] mb-5">
            Dioscore SHIKAMA <em className="italic text-w-700">&</em> Specy M.
            NJISHI
          </h2>
          <p className="text-[0.65rem] leading-[1.88] text-w-900 mb-[0.9rem]">
            What began as a friendship 15 years ago has grown into an
            unbreakable bond, a partnership built on laughter, loyalty, and an
            unwavering love for each other. We walked through life's every
            chapter side by side, until one day we realised that the person we
            had been looking for had been beside us all along.
          </p>
          <p className="text-[0.65rem] leading-[1.88] text-w-900 mb-[0.9rem]">
            On <strong>14 June 2026</strong>, we will exchange our vows in
            Alexandria, Egypt, the ancient "Bride of the Mediterranean", a city
            as timeless as our love story. We invite you to join us across three
            extraordinary days of celebration.
          </p>
        </div>
      </section>

      {/* <hr className="border-none border-t border-w-accent/18 m-0" /> */}

      {/* FACTS */}
      <section className="bg-w-50">
        <div className="max-w-[860px] mx-auto py-4 px-8">
          <p className="font-[Cinzel,serif] text-[0.6rem] tracking-[0.42em] text-w-700 uppercase mb-3 flex items-center gap-3 after:content-['']  after:h-px after:bg-w-700 after:opacity-45">
            About Alexandria
          </p>
          <h2 className="font-[Cormorant_Garamond,serif] text-[clamp(1.8rem,4.5vw,2.7rem)] font-light leading-[1.2] text-w-950 mb-5">
            Our destination <em className="italic text-w-700">Alexandria</em>
          </h2>
          <p className="text-[0.65rem] leading-[1.88] text-w-900 mb-[0.9rem]">
            Founded around 331 BC by Alexander the Great, Alexandria has been a
            crossroads of civilisations for over 2,300 years — Greek, Roman,
            Arab, Ottoman, and Mediterranean cultures all woven into one
            extraordinary city on Egypt's northern coast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.8rem] mt-[2.2rem]">
            {[
              {
                icon: "🌊",
                title: "Bride of the Mediterranean",
                body: 'Locals call Alexandria "Arousat al-Bahr al-Abyad". It stretches 40 km along the sea and is the largest city on the entire Mediterranean coast.',
              },
              {
                icon: "📚",
                title: "The Great Library",
                body: "Alexandria once housed the greatest library of the ancient world. The modern Bibliotheca Alexandrina stands on that very same legendary site today.",
              },
              {
                icon: "🏛",
                title: "Seven Wonders",
                body: "The Lighthouse of Alexandria (Pharos) was one of the Seven Wonders of the Ancient World, guiding sailors across the Mediterranean for centuries.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="border-l-2 border-w-700/60 pl-[1.1rem]"
              >
                <div className="text-[1.25rem] mb-[0.4rem]">{f.icon}</div>
                <div className="font-[Cinzel,serif] text-[0.58rem] tracking-[0.2em] text-w-700 uppercase mb-[0.4rem]">
                  {f.title}
                </div>
                <div className="text-[0.84rem] leading-[1.72] text-w-900">
                  {f.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME HEADER */}
      <div className="text-center py-8 px-8 pb-12 bg-w-50">
        <p className="font-[Cinzel,serif] text-[0.62rem] tracking-[0.44em] text-w-700 uppercase mb-3">
          Full Programme · June 2026
        </p>
        <h2 className="font-[Cormorant_Garamond,serif] text-[clamp(2rem,5vw,2.8rem)] font-light text-w-950 leading-[1.2]">
          Three Days of <em className="italic text-w-700">Celebration</em>
        </h2>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-w-700 to-transparent mx-auto my-[1.4rem]" />
        <p className="font-[Cormorant_Garamond,serif] italic text-[1rem] text-w-900 max-w-[540px] mx-auto leading-[1.75]">
          From the waters of Behry Square to the stones of a 176-year-old
          cathedral, and onward to an open-air reception under the warm
          Alexandria sky.
        </p>
      </div>

      {/* DAY 1 */}
      <div className="border-t border-w-700/20 bg-w-50">
        <div className="max-w-[860px] mx-auto py-8 px-8">
          <div className="flex items-center gap-6 mb-[2.8rem]">
            <div className="text-center min-w-[58px]">
              <div className="font-[Cormorant_Garamond,serif] text-[2.8rem] font-light text-w-700 leading-none mb-[2px]">
                13
              </div>
              <div className="font-[Cinzel,serif] text-[0.5rem] tracking-[0.2em] text-w-900 uppercase">
                June
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-w-700/38 to-transparent" />
            <div className="font-[Cinzel,serif] text-[0.58rem] tracking-[0.26em] text-w-700 uppercase whitespace-nowrap">
              Saturday — Eve of the Wedding
            </div>
          </div>
          <div className="grid grid-cols-[3px_1fr] gap-x-[1.8rem] ">
            <div className="bg-gradient-to-b from-w-accent to-w-accent/10 rounded-sm" />
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-[0.4rem] mb-[0.55rem]">
                <h3 className="font-[Cormorant_Garamond,serif] text-[1.55rem] text-w-950">
                  Cultural Evening aboard a Yacht
                </h3>
                <span className="font-[Cinzel,serif] text-[0.56rem] tracking-[0.2em] text-w-700 whitespace-nowrap">
                  18:00 — 23:00
                </span>
              </div>
              <p className="text-[0.8rem] text-w-700 italic mb-[0.9rem]">
                📍 Behry Square, Alexandria
              </p>
              <p className="text-[0.9rem] leading-[1.82] text-w-900 mb-4">
                An intimate evening on the sparkling waters of Alexandria — live
                music, cultural moments, and the warm glow of the Mediterranean
                at dusk. Gather with family and close friends aboard the yacht
                as we celebrate the eve of the wedding, with the city's iconic
                corniche glittering around us and the sea breeze carrying the
                joy of what lies ahead.
              </p>
              <div className="flex flex-wrap gap-[0.45rem]">
                {[
                  "Smart Casual Attire",
                  "Drinks & Light Bites",
                  "Pre-Wedding · Evening",
                ].map((t) => (
                  <span
                    key={t}
                    className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.16em] text-w-700 uppercase px-3 py-[0.26rem] border border-w-700/38 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 2 */}
      <div className="border-t border-w-700/20 bg-w-50">
        <div className="max-w-[860px] mx-auto py-8 px-8">
          <div className="flex items-center gap-6 mb-[2.8rem]">
            <div className="text-center min-w-[58px]">
              <div className="font-[Cormorant_Garamond,serif] text-[2.8rem] font-light text-w-700 leading-none mb-[2px]">
                14
              </div>
              <div className="font-[Cinzel,serif] text-[0.5rem] tracking-[0.2em] text-w-900 uppercase">
                June
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-w-700/38 to-transparent" />
            <div className="font-[Cinzel,serif] text-[0.58rem] tracking-[0.26em] text-w-700 uppercase whitespace-nowrap">
              Sunday — Wedding Day
            </div>
          </div>

          {/* Ceremony */}
          <div className="grid grid-cols-[3px_1fr] gap-x-[1.8rem] mb-[2.8rem]">
            <div className="bg-gradient-to-b from-w-accent to-w-accent/10 rounded-sm" />
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-[0.4rem] mb-[0.55rem]">
                <h3 className="font-[Cormorant_Garamond,serif] text-[1.55rem] text-w-950">
                  Catholic Religious Ceremony
                </h3>
                <span className="font-[Cinzel,serif] text-[0.56rem] tracking-[0.2em] text-w-700 whitespace-nowrap">
                  14:00 — 15:30
                </span>
              </div>
              <p className="text-[0.8rem] text-w-700 italic mb-[0.9rem]">
                📍 Saint Catherine Cathedral — Al Mancheya, Alexandria
              </p>
              <p className="text-[0.9rem] leading-[1.82] text-w-900 mb-4">
                A sacred Catholic ceremony uniting Dioscore and Specy before God
                and their loved ones. Saint Catherine Cathedral is a magnificent
                Neo-Baroque masterpiece constructed between 1847 and 1856 — by
                the time our vows are exchanged within its walls, this
                extraordinary cathedral will have stood for{" "}
                <strong className="text-w-accent">176 years</strong>.
              </p>
              <div className="bg-w-700/[0.07] border-l-2 border-w-700/40 px-[1.1rem] py-[0.85rem] rounded-r-sm mb-4">
                <div className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.2em] text-w-700 uppercase mb-2">
                  Practical Notes
                </div>
                <div className="text-[0.8rem] text-w-900 leading-[1.82]">
                  - Please be seated by{" "}
                  <strong className="text-w-950">13:45</strong>
                  <br />
                  - Shoulders and knees should be covered inside the cathedral
                  <br />- Photography welcome — please be discreet during the
                  ceremony
                </div>
              </div>
              <div className="flex flex-wrap gap-[0.45rem]">
                {[
                  "Formal Attire",
                  "Arrive by 13:45",
                  "176 Years of History",
                ].map((t) => (
                  <span
                    key={t}
                    className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.16em] text-w-700 uppercase px-3 py-[0.26rem] border border-w-700/38 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-[calc(3px+1.8rem)] -mt-4 mb-[2.8rem]">
            <div className="w-px h-7 bg-gradient-to-b from-w-accent/28 to-transparent" />
            <span className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.2em] text-w-accent uppercase">
              Followed by
            </span>
          </div>

          {/* Reception */}
          <div className="grid grid-cols-[3px_1fr] gap-x-[1.8rem] mb-[2.8rem]">
            <div className="bg-gradient-to-b from-w-accent to-w-accent/10 rounded-sm" />
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-[0.4rem] mb-[0.55rem]">
                <h3 className="font-[Cormorant_Garamond,serif] text-[1.55rem] text-w-950">
                  Wedding Reception
                </h3>
                <span className="font-[Cinzel,serif] text-[0.56rem] tracking-[0.2em] text-w-700 whitespace-nowrap">
                  16:00 — Late
                </span>
              </div>
              <p className="text-[0.8rem] text-w-700 italic mb-[0.9rem]">
                📍 Sunrise Alex Avenue Hotel — Sea Bite, Open Air · 29 Al-Fallah
                Street, Alexandria
              </p>
              <p className="text-[0.9rem] leading-[1.82] text-w-900 mb-4">
                The main celebration — a full sit-down dinner, live DJ, and
                dancing at the stunning Sea Bite open-air venue. With the warm
                Mediterranean breeze, the lights of Alexandria all around you,
                and the people we love most gathered together, this evening is
                set to be truly unforgettable.
              </p>
              <div className="bg-w-700/[0.07] border-l-2 border-w-700/40 px-[1.1rem] py-[0.85rem] rounded-r-sm mb-4">
                <div className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.2em] text-w-700 uppercase mb-2">
                  What to Expect
                </div>
                <div className="text-[0.8rem] text-w-900 leading-[1.82]">
                  - Full dinner — salads, herb-marinated grills,
                  dessert buffet
                  <br />
                  - Live DJ & dance floor
                  <br />
                  - Soft drinks included · Additional beverages available
                  <br />- Professional photography throughout the evening
                </div>
              </div>
              <div className="flex flex-wrap gap-[0.45rem]">
                {[
                  "Cocktail / Evening Wear",
                  "Open Air Venue",
                  "Dinner & Dancing",
                ].map((t) => (
                  <span
                    key={t}
                    className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.16em] text-w-700 uppercase px-3 py-[0.26rem] border border-w-700/38 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-[calc(3px+1.8rem)] -mt-4 mb-[2.8rem]">
            <div className="w-px h-7 bg-gradient-to-b from-w-accent/28 to-transparent" />
            <span className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.2em] text-w-accent uppercase">
              Continuing into the night
            </span>
          </div>

          {/* After Party */}
          <div className="grid grid-cols-[3px_1fr] gap-x-[1.8rem]">
            <div className="bg-gradient-to-b from-w-accent/50 to-w-accent/5 rounded-sm" />
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-[0.4rem] mb-[0.55rem]">
                <h3 className="font-[Cormorant_Garamond,serif] text-[1.55rem] text-w-950">
                  After Party
                </h3>
                <span className="font-[Cinzel,serif] text-[0.56rem] tracking-[0.2em] text-w-700 whitespace-nowrap">
                  Late Night
                </span>
              </div>
              <p className="text-[0.8rem] text-w-700 italic mb-[0.9rem]">
                📍 Sunrise Alex Avenue Hotel, Alexandria
              </p>
              <p className="text-[0.9rem] leading-[1.82] text-w-900 mb-4">
                For those not yet ready to let the night end — the celebration
                continues with more music, more dancing, and more joy deep into
                the Alexandria night. Full details will be shared with confirmed
                guests closer to the date.
              </p>
              <div className="flex flex-wrap gap-[0.45rem]">
                {["After Party", "Details TBC", "Confirmed Guests Only"].map(
                  (t) => (
                    <span
                      key={t}
                      className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.16em] text-w-700 uppercase px-3 py-[0.26rem] border border-w-700/38 rounded-sm"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DRESS CODE */}
      <div className="border-t border-w-700/20 bg-w-50">
        <div className="max-w-[860px] mx-auto p-8">
          <div className="font-[Cinzel,serif] text-[0.58rem] tracking-[0.32em] text-w-700 uppercase text-center mb-5">
            Dress Code at a Glance
          </div>
          <div className="grid gap-3 grid-cols-3 text-center">
            {[
              { icon: "🎩", event: "Yacht Evening", code: "Smart Casual" },
              {
                icon: "👔",
                event: "Cathedral Ceremony",
                code: "Formal / Sunday Best",
              },
              {
                icon: "🍾",
                event: "Reception",
                code: "Cocktail / Evening Wear",
              },
            ].map((d, i) => (
              <div
                key={d.event}
                className={`p-[0.8rem] ${i < 3 ? "border border-w-accent rounded-lg bg-white" : ""}`}
              >
                <div className="text-[1.1rem] mb-1">{d.icon}</div>
                <div className="font-[Cinzel,serif] text-[0.52rem] tracking-[0.14em] text-w-900 uppercase mb-[0.18rem]">
                  {d.event}
                </div>
                <div className="font-[Cormorant_Garamond,serif] italic text-[0.92rem] text-w-700">
                  {d.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP FORM */}
      <RSVPForm />

      {/* CONTACT */}
      <div className="bg-dark-card border-t border-w-accent/16 py-10 px-8 text-center">
        <div className="font-[Cinzel,serif] text-[0.56rem] tracking-[0.32em] text-w-accent uppercase mb-[1.1rem]">
          Questions?
        </div>
        <div className="flex justify-center items-start gap-4 lg:gap-8">
          <div>
            <div className="font-[Cormorant_Garamond,serif] text-[1.05rem] text-white/75 italic">
              Dioscore
            </div>
            <div className="text-[0.8rem] text-w-900 mt-[0.2rem]">
              <a
                href="mailto:doresdios@gmail.com"
                className="text-w-700 no-underline hover:text-w-accent"
              >
                doresdios@gmail.com
              </a>
            </div>
          </div>
          <div className="w-px bg-w-accent/18 self-stretch min-h-[50px]" />
          <div>
            <div className="font-[Cormorant_Garamond,serif] text-[1.05rem] text-white/75 italic">
              Specy
            </div>
            <div className="text-[0.8rem] text-w-900 mt-[0.2rem]">
              <a
                href="mailto:specymukanjishi@gmail.com"
                className="text-w-700 no-underline hover:text-w-accent"
              >
                specymukanjishi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark-bg text-white/28 text-center p-8 text-[0.75rem] leading-[1.8] border-t border-white/[0.04]">
        <span className="font-[Cormorant_Garamond,serif] text-[1.3rem] text-w-accent block mb-[0.3rem]">
          Dioscore & Specy
        </span>
        14 June 2026 · Alexandria, Egypt
        <br />
        15 years of friendship, a lifetime of love
      </footer>
    </main>
  );
}
