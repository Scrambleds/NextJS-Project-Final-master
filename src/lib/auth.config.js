export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.userId && user.firstname && user.lastname) {
        token.userId = user.userId;
        token.isAdmin = user.isAdmin;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user.userId = token.userId),
        (session.user.isAdmin = token.isAdmin);
        (session.user.firstname = token.firstname);
        (session.user.lastname = token.lastname);
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnStartPanel = request.nextUrl?.pathname.startsWith("/");
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnSubjectListPanel = request.nextUrl?.pathname.startsWith("/list/subjectlist");
      const isOnStudentListtPanel = request.nextUrl?.pathname.startsWith("/list/studentlist");
      const isOnImportMaintainPanel = request.nextUrl?.pathname.startsWith("/import/importmaintain");
      const isOnImportListPanel = request.nextUrl?.pathname.startsWith("/import/importlist");

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnSubjectListPanel && !user) {
        return false;
      }

      if (isOnStudentListtPanel && !user) {
        return false;
      }

      if (isOnImportListPanel && !user) {
        return false;
      }

      if (isOnImportMaintainPanel && !user) {
        return false;
      }

      if (isOnStartPanel && !user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
