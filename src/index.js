import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { registerLicense } from '@syncfusion/ej2-base';

// Syncfusion License Key Registration
// 무료 Community License를 받으려면: https://www.syncfusion.com/account/manage-license/downloads
// 라이선스 키를 받은 후 아래 주석을 해제하고 YOUR_LICENSE_KEY를 실제 키로 교체하세요
// registerLicense('YOUR_LICENSE_KEY');

// Remove Syncfusion Trial License Banner (라이선스 키가 없을 때만 필요)
const removeTrialBanner = () => {
  // Remove banner elements
  const banners = document.querySelectorAll('[id*="syncfusion"], [class*="e-trial"], [class*="trial"]');
  banners.forEach(banner => {
    if (banner && banner.parentNode) {
      banner.style.display = 'none';
      banner.remove();
    }
  });

  // Remove fixed position banners
  const fixedBanners = document.querySelectorAll('div[style*="position: fixed"][style*="z-index"]');
  fixedBanners.forEach(banner => {
    const style = banner.getAttribute('style') || '';
    if (style.includes('z-index') && (style.includes('9999') || style.includes('99999'))) {
      const text = banner.textContent || '';
      if (text.includes('trial') || text.includes('Syncfusion') || text.includes('license')) {
        banner.style.display = 'none';
        banner.remove();
      }
    }
  });
};

// Remove banner on load and periodically check (라이선스 키가 없을 때만 필요)
removeTrialBanner();
setInterval(removeTrialBanner, 1000);

// Render whole app
ReactDOM.render(<App />, document.getElementById("root"));
