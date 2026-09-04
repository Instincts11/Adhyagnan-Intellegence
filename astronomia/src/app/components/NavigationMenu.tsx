"use client";
import SiteHeader from "./marketing/SiteHeader";

interface NavigationBarProps {
  pageTitle?: string;
  showBackButton?: boolean;
  backPath?: string;
}

export default function NavigationBar(_props: NavigationBarProps) {
  return <SiteHeader />;
}
