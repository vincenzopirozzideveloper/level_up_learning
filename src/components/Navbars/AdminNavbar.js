

// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";
import GamingNavbarLinks from "./GamingNavbarLinks";
import { gamingTheme } from "../../theme/gaming-design-system";
import { FaHome, FaChevronRight } from "react-icons/fa";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const {
    variant,
    children,
    fixed,
    secondary,
    brandText,
    onOpen,
    ...rest
  } = props;

  // Gaming theme colors
  let mainText = gamingTheme.colors.text.primary;
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = `${gamingTheme.colors.bg.primary}CC`;
  let navbarBorder = gamingTheme.colors.border.default;
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.fixed === true)
    if (scrolled === true) {
      navbarPosition = "fixed";
      navbarShadow = "0px 7px 23px rgba(0, 0, 0, 0.05)";
      navbarBg = `${gamingTheme.colors.bg.card}EE`;
      navbarBorder = gamingTheme.colors.border.hover;
      navbarFilter = "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))";
      navbarBackdrop = "blur(42px)";
    }
  if (props.secondary) {
    navbarBackdrop = "blur(42px)";
    // navbarPosition = "absolute";
    // mainText = "white";
    // secondaryText = "white";
    // secondaryMargin = "22px";
    // paddingX = "30px";
  }
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth='1.5px'
      borderStyle='solid'
      transitionDelay='0s, 0s, 0s, 0s'
      transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
      transition-property='box-shadow, background-color, filter, border'
      transitionTimingFunction='linear, linear, linear, linear'
      alignItems={{ xl: "center" }}
      borderRadius='16px'
      display='flex'
      minH='75px'
      justifyContent={{ xl: "center" }}
      lineHeight='25.6px'
      mx='auto'
      mt={secondaryMargin}
      pb='8px'
      right={"30px"}
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt='8px'
      top='18px'
      w={{ sm: "calc(100vw - 60px)", xl: "calc(100vw - 75px - 275px)" }}>
      <Flex
        w='100%'
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}>
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb separator={<FaChevronRight color={gamingTheme.colors.text.muted} size="10px" />}>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href='#' 
                color={gamingTheme.colors.text.muted}
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ color: gamingTheme.colors.accent.primary }}
              >
                <FaHome />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink 
                href='#' 
                color={gamingTheme.colors.text.primary}
                fontSize="sm"
                fontWeight="bold"
              >
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Page Title */}
          <Link
            color={gamingTheme.colors.text.primary}
            href='#'
            bg='inherit'
            borderRadius='inherit'
            fontSize="2xl"
            fontWeight='bold'
            fontFamily={gamingTheme.typography.fonts.heading}
            letterSpacing={gamingTheme.typography.letterSpacing.wide}
            textTransform="uppercase"
            _hover={{ color: gamingTheme.colors.accent.primary }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}>
            {brandText}
          </Link>
        </Box>
        <Box ms='auto' w={{ sm: "100%", md: "unset" }}>
          <GamingNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
