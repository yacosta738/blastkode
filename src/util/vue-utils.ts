// src/lib/vue-utils.ts
import {computed, ComputedRef, getCurrentInstance} from "@vue/composition-api";

export function useStaticQuery<T>(): ComputedRef<T> {
    return computed(() => (getCurrentInstance() as unknown as { $static: T }).$static);
}

export function usePageQuery<T>(): ComputedRef<T> {
    return computed(() => (getCurrentInstance() as unknown as { $page: T }).$page);
}
