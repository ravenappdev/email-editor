import lz from "lzutf8";
export function encodeJson(json) {
    return lz.encodeBase64(lz.compress(json));
}
export function decodeJson(json) {
    return lz.decompress(lz.decodeBase64(json));
}
