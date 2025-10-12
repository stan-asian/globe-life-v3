import type { IStaticMethods } from "preline/dist";
import type noUiSlider from "nouislider"; // ✅ Import the type

declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone;
    VanillaCalendarPro;

    // Preline UI
    HSStaticMethods: IStaticMethods;

    // ✅ noUiSlider
    noUiSlider: typeof noUiSlider;
  }
}

export {};