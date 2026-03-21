import eidMubarak from "@/assets/eid-mubarak.svg";

export function Greet() {
  return (
    <>
      <a href="https://www.vecteezy.com/vector-art/22083902-eid-mubarak-hand-lettering-with-lantern-decoration-greeting-card-concept">
        <img
          src={eidMubarak}
          className="absolute top-2/7 left-1/2 -translate-1/2 h-2/5 w-auto floating-element"
        />
      </a>
      <div className="absolute top-[calc(11/14*100%-3rem)] left-1/2 -translate-1/2 text-center space-y-8">
        <div lang="ara" className="alkalami-regular big-text">
          {"تَقَبَّلَ اللهُ مِنَّا وَمِنكُم"}
        </div>
        <div className="playfair-display text-muted-foreground big-subtext">
          “May Allah accept [good deeds] from you and us”
        </div>
      </div>
    </>
  );
}
