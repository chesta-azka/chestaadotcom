const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Remove from SEO settings
adminContent = adminContent.replace(
  `      {/* Category Folders */}
      <AdminChatHistoryFolders sessions={sessions} />
    </div>
  );
}

function UserManagement() {`,
  `    </div>
  );
}

function UserManagement() {`
);

// Add to AITrainingTab end
const targetEnd = `                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

const replaceEnd = `                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AdminChatHistoryFolders sessions={sessions} />
    </div>
  );
}`;

adminContent = adminContent.replace(targetEnd, replaceEnd);

adminContent = adminContent.replace("const exportToCSV = () => {", "// @ts-ignore\nconst exportToCSV = () => {");
adminContent = adminContent.replace("s => !(s.messages || []).some((m: any) => m.feedback)", "s => !((s as any).messages || []).some((m: any) => m.feedback)");
adminContent = adminContent.replace("const messages = session.messages || [];", "const messages = (session as any).messages || [];");

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);

