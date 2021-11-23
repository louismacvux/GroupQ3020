import TrackingParameter from "./TrackingParameter";
import VirtualTrackingParameter from "./VirtualTrackingParameter";
import TrackingParameterGroup from "./TrackingParameterGroup";

class TrackingParameterParent {

     #children
     #cache

     constructor(children) {
          if (this.constructor === TrackingParameterParent) {
               throw Error("TrackingParameterParent is abstract and cannot be instantiated.");
          }
          this.#children = children;
          Object.values(this.#children).forEach((child) => { child.parent = this });
          this.#cache = {};
     }

     getDescendentByName(name) {
          if (!this.#cache.descendents) {
               this.getDescendents();
          }
          let result = this.#cache.descendents.find((parameter) => parameter.name.toLowerCase() === name.toLowerCase());
          return result;
     }

     getDescendents() {
          if (!this.#cache.descendents) {
               this.#cache.descendents = [];
               let keys = Object.keys(this.children);
               keys.forEach((key) => {
                    let child = this.children[key];
                    if (child instanceof TrackingParameter || child instanceof VirtualTrackingParameter || child instanceof TrackingParameterGroup) {
                         this.#cache.descendents.push(child);
                         if (child instanceof TrackingParameterParent) {
                              this.#cache.descendents.push(...child.getDescendents());
                         }
                    }
               })
          }
          return this.#cache.descendents;
     }

     get cache() {
          return this.#cache;
     }

     set cache(newCache) {
          this.#cache = newCache;
     }

     get children() {
          return this.#children;
     }

     set children(newChildren) {
          this.#children = newChildren;
     }

}

export default TrackingParameterParent;