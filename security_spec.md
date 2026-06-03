# Security Specification - CHESTADOTCOM Journal

## Data Invariants
1. A **User** profile must belong to the authenticated UID.
2. A **Post** must have an authorId matching the currently logged-in user.
3. Users cannot promote themselves to 'admin' role.
4. Users can only create posts with status 'draft'.
5. Only admins can change a post status to 'published' or 'rejected'.
6. Published posts are public.

## The "Dirty Dozen" Payloads

1. **Self-Promotion**: Create a user document with `role: 'admin'`. (Fail: Rules enforce role 'user' on creation).
2. **Identity Spoofing**: Create a post with `authorId: 'other-user-uid'`. (Fail: Rules check authorId matches request.auth.uid).
3. **Status Hijack**: Create a post with `status: 'published'`. (Fail: Rules enforce 'draft' on create).
4. **Junk ID Entry**: Attempt to create document with 1KB junk-string ID. (Fail: Rules use isValidId helper).
5. **PII Blanket Read**: Attempt to list all users. (Fail: list /users is restricted to admins).
6. **Orphaned Post Update**: Non-owner attempts to update a draft. (Fail: Rules check isOwner).
7. **Post outcome skip**: Update a draft directly to 'published' as a user. (Fail: Users can only have action 'draft' -> 'draft').
8. **Malicious Content**: Inject 1MB content string. (Fail: size() constraint on content field).
9. **Role Injection**: Update existing user to add `role: 'admin'`. (Fail: update /users affectedKeys doesn't include 'role').
10. **Delete Vandalism**: Non-owner deletes a published post. (Fail: delete check isOwner or Admin).
11. **Draft Leak**: Requesting a specific draft slug as a guest. (Fail: get check status or isOwner).
12. **Admin Spoofing**: Adding self to /admins collection. (Fail: Global catch-all blocks writes to /admins).
