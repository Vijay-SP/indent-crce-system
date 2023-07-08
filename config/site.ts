import { DashboardIcon } from "@radix-ui/react-icons"
import { Book, Building, GraduationCap, Home, Library } from "lucide-react"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Indent",
  description: "College Indent",
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: DashboardIcon,
    },
    {
      title: "Teachers",
      href: "/admin/teachers",
      icon: GraduationCap,
    },
    {
      title: "Colleges",
      href: "/admin/colleges",
      icon: Building,
    },
    {
      title: "Subjects",
      href: "/admin/subjects",
      icon: Book,
    },
    {
      title: "Courses",
      href: "/admin/courses",
      icon: Library,
    },
  ],
  userNav: [
    {
      title: "Dashboard",
      href: "/coordinator",
      icon: DashboardIcon,
    },
    {
      title: "Update College Details",
      href: "/coordinator/college",
      icon: Building,
    },
    {
      title: "Update Teachers Details",
      href: "/coordinator/teachers",
      icon: GraduationCap,
    },
  ],
}
