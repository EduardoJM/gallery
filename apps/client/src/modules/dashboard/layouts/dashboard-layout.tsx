import { useAuth } from "@/modules/auth/contexts";
import { Navigate, Outlet } from "react-router-dom";
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useMemo } from "react";
import { useSignOutMutation } from '@/modules/auth/mutations';

export const DashboardLayout = () => {
  const { user } = useAuth();
  const signoutMutation = useSignOutMutation();

  const avatarName = useMemo(() => {
    if (!user?.name) {
      return '';
    }
    const names = user.name.split(' ')
    if (names.length <= 1) {
      return user.name[0]
    }
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }, [user]);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col items-stretch">
      <div className="h-[64px] bg-primary sticky top-0 z-50	flex flex-row items-center px-6">
        <div className="flex-1"></div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="items-center justify-center bg-white">
              <AvatarFallback>{avatarName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signoutMutation.mutate()}
              disabled={signoutMutation.isPending}
            >
              {signoutMutation.isPending ? 'Saindo...' : 'Sair'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-28">
        <Outlet />
      </div>
    </div>
  )
};
