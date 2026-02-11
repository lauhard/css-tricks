import { type Icon as IconType } from 'lucide-svelte'
export const routes = [
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/experiment2',
        name: 'Experiment 2'
    }
];
export interface Route {
    path?: string;
    fn?: (callback?: () => void) => void | Promise<void>;
    style?: string;
    name: string;
    icon?: typeof IconType | undefined;
    public?: boolean;
    role?: string;
    subRoutes?: Route[];
}
