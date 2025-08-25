export const drawerStyles = {
  components: {
    Drawer: {
      // 3. We can add a new visual variant
      variants: {
        withShadow: {
          placement: "right",
          boxShadow: "0 0 2px 2px #efdfde",
          bgColor: "red",
        },
      },
    },
  },
};
