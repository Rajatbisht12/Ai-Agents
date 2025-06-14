import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";

export default function DashboardNavbar() {
    const {state, toggleSidebar, isMobile} = useSidebar();

    return (
        <Button 
            className="size-9" 
            variant="ghost" 
            onClick={toggleSidebar}
            size="icon"
        >
            {(state === "collapsed" || isMobile)
            ? <PanelLeftIcon className="size-5"/> 
            : <PanelLeftCloseIcon className="size-5"/>}
        </Button>
    );
}