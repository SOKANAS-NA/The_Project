import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user?: User | null; showEmail?: boolean }) {
    const getInitials = useInitials();

    if (!user) {
        return (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Avatar className="h-8 w-8 rounded-full bg-neutral-200" />
                <div className="flex flex-col">
                    <span className="font-medium">Utilisateur inconnu</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar ?? ''} alt={user.name ?? 'Avatar'} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black">
                    {getInitials(user.name ?? '')}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="text-muted-foreground truncate text-xs">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
