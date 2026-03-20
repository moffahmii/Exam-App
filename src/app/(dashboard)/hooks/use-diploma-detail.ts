// // app/(dashboard)/hooks/use-diplomas.ts
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { getDiplomas } from '@/lib/api/dashboard/diplomas-api';

// export default function useDiplomas() {
//   return useInfiniteQuery({
//     queryKey: ['diplomas'],
//     queryFn: ({ pageParam = 1 }) => getDiplomas(pageParam),
//     getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined, // لازم API يرجع nextPage
//   });
// }