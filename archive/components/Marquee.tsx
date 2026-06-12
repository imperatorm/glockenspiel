import { marqueeItems } from "@/lib/site";

export function Marquee() {
  const sequence = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div className="marquee-half" key={half}>
            {sequence.map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
