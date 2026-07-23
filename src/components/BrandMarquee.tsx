import React from 'react';

const brands = [
    'UNIDAYS', 'CURRYS', 'ACER', 'TACO BELL', 'DAIU COVENTRY', 'FINAL ROUND AI', 'RYMAN', 'C4 ENERGY'
];

export default function BrandMarquee() {
    return (
        <section 
        aria-label="Brands I have worked with" 
        className="bg-ink py-3 text-paper overflow-hidden"
        >
        <div className="flex w-fit group">
            
            {/* Track 1: Original */}
            <div className="flex min-w-full shrink-0 animate-[marquee_25s_linear_infinite] items-center justify-around group-hover:[animation-play-state:paused]">
            {brands.map((brand) => (
                <React.Fragment key={brand}>
                <span className="mx-4 font-display text-sm font-extrabold uppercase tracking-wide sm:mx-6 sm:text-base">
                    {brand}
                </span>
                <span aria-hidden="true" className="font-mono text-paper/70">-</span>
                </React.Fragment>
            ))}
            </div>

            {/* Track 2: Duplicate (Required for the seamless loop) */}
            <div aria-hidden="true" className="flex min-w-full shrink-0 animate-[marquee_25s_linear_infinite] items-center justify-around group-hover:[animation-play-state:paused]">
            {brands.map((brand) => (
                <React.Fragment key={`${brand}-dup`}>
                <span className="mx-4 font-display text-sm font-extrabold uppercase tracking-wide sm:mx-6 sm:text-base">
                    {brand}
                </span>
                <span aria-hidden="true" className="font-mono text-paper/70">-</span>
                </React.Fragment>
            ))}
            </div>

        </div>
        </section>
    );
}