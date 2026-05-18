"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import {
  LayoutDashboard,
  BookOpen,
  FolderGit2,
  FileText,
  Target,
  Menu,
  X,
  FlaskConical,
  GraduationCap,
} from "lucide-react";

const NavContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const LogoImage = styled(Image)`
  object-fit: contain;
  border-radius: 8px;
`;

const LogoText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const DesktopNavList = styled.div`
  display: none;
  gap: 0.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #4b5563;

  &:hover {
    background: #f3f4f6;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavList = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  z-index: 49;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  ${(props) =>
    props.$active
      ? `
    background: #eff6ff;
    color: #3b82f6;
  `
      : `
    color: #4b5563;
    &:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
  `}
`;

const MobileNavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) =>
    props.$active
      ? `
    background: #eff6ff;
    color: #3b82f6;
  `
      : `
    color: #4b5563;
    &:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
  `}
`;

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/topics", label: "Topics", icon: BookOpen },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/practice", label: "Practice", icon: Target },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <NavContainer>
      <NavWrapper>
        <LogoContainer href="/">
          <LogoImage
            src="/owl-logo.jpg"
            alt="Owl Logo"
            width={30}
            height={30}
            priority
          />
          <LogoText>Learning Tracker</LogoText>
        </LogoContainer>

        <DesktopNavList>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <NavLink key={item.href} href={item.href} $active={isActive}>
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </DesktopNavList>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </NavWrapper>

      <MobileNavList $isOpen={isMobileMenuOpen}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <MobileNavLink
              key={item.href}
              href={item.href}
              $active={isActive}
              onClick={closeMobileMenu}
            >
              <Icon size={20} />
              {item.label}
            </MobileNavLink>
          );
        })}
      </MobileNavList>
    </NavContainer>
  );
}
