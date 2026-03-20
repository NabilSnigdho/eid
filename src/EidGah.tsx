import centerDome from "@/assets/center-dome.svg";
import wall from "@/assets/wall.svg";



export function EidGah() {
  return       <div className="absolute bottom-3/7 h-24 w-full flex items-end horizon">
        <div
          style={{ backgroundImage: `url("${wall}")` }}
          className="h-8 bg-repeat-x bg-contain flex-[1_0_0] bg-right"
        />
        <img src={centerDome} className="h-24 w-auto" />
        <div
          style={{ backgroundImage: `url("${wall}")` }}
          className="h-8 bg-repeat-x bg-contain flex-[1_0_0] bg-left"
        />
      </div>;
}
