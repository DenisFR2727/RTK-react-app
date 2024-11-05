declare module "wowjs" {
  export default class WOW {
    constructor(options?: { live?: boolean; callback?: () => void });
    init(): void;
  }
}
