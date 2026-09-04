/**
 * GitHub Pages 등 서브패스(basePath) 배포 환경을 지원하기 위한 자산 경로 헬퍼 유틸리티
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === 'production'
    ? '/namu-auction'
    : '';

export function getAssetPath(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // 이미 BASE_PATH가 붙어 있는 경우 중복 방지
  if (BASE_PATH && cleanPath.startsWith(BASE_PATH)) {
    return cleanPath;
  }
  return `${BASE_PATH}${cleanPath}`;
}
