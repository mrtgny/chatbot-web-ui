const FORM_LAYOUT = {
  default: {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  },
};

const SAFE_ARE = {
  TOP: "var(--safe-area-inset-top, env(safe-area-inset-top))",
  RIGHT: "var(--safe-area-inset-right, env(safe-area-inset-right))",
  BOTTOM: "var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
  LEFT: "var(--safe-area-inset-left, env(safe-area-inset-left))",
};

export const APP_CDN_API = process.env.NEXT_PUBLIC_APP_CDN_API;
export { FORM_LAYOUT, SAFE_ARE };
