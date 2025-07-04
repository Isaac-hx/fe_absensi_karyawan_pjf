import { User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UtilityContext } from "../context/UtilityContext";
import { useContext } from "react";
import TextLabel from "./TextLabel";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { activeSidebar, setActiveSidebar, menuState } = useContext(UtilityContext);
  const {globalUser} = useContext(AppContext)
  
const handleLogout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
};
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Logo hanya muncul pada tablet ke atas */}
         <div >
          <a href="/dashboard-admin">          <img  src="/main_icon.png" width={40} alt="" />
</a>
        </div>

      {/* Ikon menu untuk tampilan mobile */}
      <div>
        <Menu className="md:hidden" onClick={() => setActiveSidebar(!activeSidebar)} />
      </div>

      {/* Label teks */}
      <div className="md:ml-50">
        <TextLabel text={menuState} />
      </div>

      {/* Dropdown user */}
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative cursor-pointer h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{globalUser.username}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              <span onClick={handleLogout} className="text-red-500">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
