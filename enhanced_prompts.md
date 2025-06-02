Create a reusable Header component that can be shared across dashboard, KYC, and send pages with the following specifications:

1. **Header Component Creation:**
   - Extract the existing dashboard header into a new reusable component at `components/common/Header.tsx`
   - Ensure it maintains the current design (transparent background, 20px top/bottom padding, logo, profile dropdown)
   - Make it flexible to work across dashboard, KYC, and send page layouts

2. **Profile Dropdown Enhancement:**
   - Add "Profile" menu item to the dropdown (as a placeholder link for now)
   - Add "Logout" menu item to the dropdown with functional logout behavior
   - Maintain existing dropdown styling (shadcn/tailwind, no scroll bar changes on open/close)

3. **Authentication State Management with Zustand:**
   - Create a new Zustand store for authentication state management with persist middleware
   - Store user authentication data from both signup and signin flows in this store
   - Use sessionStorage (not localStorage) for persistence, following the project's existing pattern
   - Include user data fields like email, name, and authentication status

4. **Logout Functionality Implementation:**
   - Implement logout function that clears the authentication state from Zustand store
   - Redirect users to the signin page after logout
   - Ensure the logout works regardless of whether user signed up or signed in

5. **Header Integration:**
   - Replace existing header implementations in dashboard, KYC, and send pages with the new reusable Header component
   - Ensure consistent behavior and styling across all pages
   - Maintain existing responsive design and accessibility features

6. **Project Cleanup:**
   - Remove only genuinely unused files and folders (not test files, as those were already removed)
   - Do not remove any files that might be needed for future features
   - Focus on removing duplicate code, unused imports, or orphaned files
   - Ensure no breaking changes to existing functionality

**Important Notes:**
- Maintain all existing design preferences (colors, spacing, styling)
- Ensure the header works with the existing sidebar layout
- Keep the same user experience and visual design
- Test that all pages (dashboard, KYC, send) work correctly with the new header
- Verify logout functionality works properly and redirects to signin page