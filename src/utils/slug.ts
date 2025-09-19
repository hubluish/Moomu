let nodeCrypto: typeof import("crypto") | undefined = undefined;
if (typeof window === "undefined") {
  // Node.js 환경에서만 import
  nodeCrypto = await import("crypto");
}

export function toSlug(text: string) {
  // 브라우저 환경에서는 encodeURIComponent 사용
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    return encodeURIComponent(text);
  }
  // Node.js 환경(SSR)에서는 crypto 사용
  if (nodeCrypto) {
    return nodeCrypto.createHash("sha256").update(text).digest("hex");
  }
  return encodeURIComponent(text);
}
