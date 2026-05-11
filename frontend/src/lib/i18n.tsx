"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type TranslationMap = Record<string, Record<string, any>>;

const viTranslations: TranslationMap = {
  "Navigation": {
    dashboard: "Bảng Điều Khiển",
    workspaces: "Không Gian Làm Việc",
    orgKnowledge: "Kiến Thức",
    helpCenter: "Trung Tâm Trợ Giúp",
    wiki: "Wiki",
    aiSkills: "Kỹ Năng AI",
    organization: "Tổ Chức",
    departments: "Phòng Ban",
    employees: "Nhân Viên",
    roles: "Vai Trò",
    system: "Hệ Thống",
    auditLog: "Nhật Ký Kiểm Tra",
    settings: "Cài Đặt",
    profile: "Hồ Sơ",
    signOut: "Đăng Xuất",
  },
  "Common": {
    save: "Lưu",
    cancel: "Hủy",
    create: "Tạo",
    edit: "Sửa",
    delete: "Xóa",
    search: "Tìm Kiếm",
    searchPlaceholder: "Tìm kiếm...",
    loading: "Đang tải...",
    noResults: "Không có kết quả",
    confirm: "Xác Nhận",
    close: "Đóng",
    back: "Quay Lại",
    next: "Tiếp Theo",
    add: "Thêm",
    remove: "Xóa Bỏ",
    update: "Cập Nhật",
    submit: "Gửi",
    refresh: "Làm Mới",
    view: "Xem",
    upload: "Tải Lên",
    copy: "Sao Chép",
    filter: "Lọc",
    select: "Chọn",
    selectAll: "Chọn Tất Cả",
    none: "Không",
    yes: "Có",
    no: "Không",
    ok: "OK",
    apply: "Áp Dụng",
    retry: "Thử Lại",
    required: "Bắt Buộc",
    active: "Hoạt Động",
    inactive: "Ngừng",
  },
  "Pages": {
    dashboard: {
      title: "Bảng Điều Khiển",
      description: "Quản lý dự án và tương tác khách hàng — mỗi dự án có đội ngũ và tài liệu riêng.",
      newWorkspace: "Tạo Không Gian",
    },
    departments: {
      title: "Phòng Ban",
      description: "Sắp xếp nhân viên theo phòng ban và quản lý quyền truy cập kiến thức.",
      addDepartment: "Thêm Phòng Ban",
    },
    employees: {
      title: "Nhân Viên",
      description: "Quản lý tài khoản người dùng và token truy cập MCP.",
      addEmployee: "Thêm Nhân Viên",
    },
    roles: {
      title: "Vai Trò",
      description: "Định nghĩa các bộ quyền có thể gán cho nhân viên.",
      createRole: "Tạo Vai Trò",
    },
    projects: {
      title: "Dự Án",
      description: "Quản lý bối cảnh kiến thức đa chức năng.",
    },
    workspaces: {
      title: "Không Gian Làm Việc",
      description: "Quản lý dự án và tương tác khách hàng.",
    },
    knowledge: {
      title: "Kho Kiến Thức",
      description: "Quản lý và tổ chức tài liệu của tổ chức.",
      uploadDocument: "Tải Tài Liệu",
      addCategory: "Thêm Danh Mục",
    },
    wiki: {
      title: "Wiki Kiến Thức",
      description: "Kiến thức được tổng hợp từ tài liệu.",
      wikiIsEmpty: "Wiki trống",
      wikiIsEmptyDesc: "Tải tài liệu để bắt đầu xây dựng wiki.",
    },
    profile: {
      title: "Hồ Sơ",
      description: "Quản lý cài đặt tài khoản.",
      updatePassword: "Đổi Mật Khẩu",
    },
    settings: {
      title: "Cài Đặt",
      description: "Cấu hình nhà cung cấp AI.",
      llmProvider: "Nhà Cung Cấp LLM",
      visionProvider: "Nhà Cung Cấp Vision",
    },
    audit: {
      title: "Nhật Ký Kiểm Tra",
      description: "Xem xét quyết định kiểm soát truy cập.",
      refresh: "Làm Mới",
    },
    guide: {
      title: "Trung Tâm Trợ Giúp",
      description: "Hướng dẫn sử dụng cho tổ chức.",
    },
    skills: {
      title: "Kỹ Năng AI",
      description: "Quản lý và triển khai các gói kỹ năng.",
    },
  },
  "Dialogs": {
    createDepartment: "Tạo Phòng Ban",
    editDepartment: "Sửa Phòng Ban",
    createEmployee: "Thêm Nhân Viên",
    editEmployee: "Sửa Nhân Viên",
    createRole: "Tạo Vai Trò",
    editRole: "Sửa Vai Trò",
    newWorkspace: "Tạo Không Gian",
    editWorkspace: "Sửa Không Gian",
    createKnowledgeType: "Tạo Loại Kiến Thức",
    editKnowledgeType: "Sửa Loại Kiến Thức",
    uploadDocument: "Tải Tài Liệu",
    editSkill: "Sửa Kỹ Năng",
    addTags: "Lưu Thẻ",
  },
  "Messages": {
    saveFailed: "Lưu thất bại",
    deleteFailed: "Xóa thất bại",
    loadFailed: "Tải thất bại",
    uploadFailed: "Tải lên thất bại",
    actionFailed: "Thao tác thất bại",
    loginFailed: "Đăng nhập thất bại",
    passwordRequired: "Mật khẩu bắt buộc",
    nameRequired: "Tên bắt buộc",
    noDepartments: "Chưa có phòng ban",
    noEmployees: "Chưa có nhân viên",
    noRoles: "Chưa có vai trò",
    noWorkspaces: "Chưa có không gian làm việc",
    noDocuments: "Không tìm thấy tài liệu",
    noAuditLogs: "Không có nhật ký kiểm tra",
    noMembers: "Chưa có thành viên",
    searchNoResults: "Không tìm thấy kết quả",
    passwordChanged: "Đổi mật khẩu thành công",
  },
  "Table": {
    name: "Tên",
    email: "Email",
    role: "Vai Trò",
    department: "Phòng Ban",
    status: "Trạng Thái",
    actions: "Thao Tác",
    active: "Hoạt Động",
    inactive: "Ngừng",
    edit: "Sửa",
    delete: "Xóa",
    deactivate: "Vô Hiệu",
    activate: "Kích Hoạt",
  },
  "Form": {
    name: "Tên",
    description: "Mô Tả",
    email: "Email",
    password: "Mật Khẩu",
    confirmPassword: "Xác Nhận Mật Khẩu",
    role: "Vai Trò",
    department: "Phòng Ban",
    customRole: "Vai Trò Tùy Chỉnh",
    knowledgeType: "Loại Kiến Thức",
    scope: "Phạm Vi",
    global: "Toàn Cục",
    workspace: "Không Gian",
    enterName: "Nhập tên",
    enterEmail: "Nhập email",
    enterPassword: "Nhập mật khẩu",
    selectRole: "Chọn vai trò",
    selectDepartment: "Chọn phòng ban",
    optionalDescription: "Mô tả tùy chọn...",
    min6Chars: "Tối thiểu 6 ký tự",
    min8Chars: "Tối thiểu 8 ký tự",
  },
};

const enTranslations: TranslationMap = {
  "Navigation": {
    dashboard: "Dashboard",
    workspaces: "Workspaces",
    orgKnowledge: "Org Knowledge",
    helpCenter: "Help Center",
    wiki: "Wiki",
    aiSkills: "AI Skills",
    organization: "Organization",
    departments: "Departments",
    employees: "Employees",
    roles: "Roles",
    system: "System",
    auditLog: "Audit Log",
    settings: "Settings",
    profile: "Profile",
    signOut: "Sign out",
  },
  "Common": {
    save: "Save",
    cancel: "Cancel",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    searchPlaceholder: "Search...",
    loading: "Loading...",
    noResults: "No results",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    next: "Next",
    add: "Add",
    remove: "Remove",
    update: "Update",
    submit: "Submit",
    refresh: "Refresh",
    view: "View",
    upload: "Upload",
    copy: "Copy",
    filter: "Filter",
    select: "Select",
    selectAll: "Select All",
    none: "None",
    yes: "Yes",
    no: "No",
    ok: "OK",
    apply: "Apply",
    retry: "Retry",
    required: "Required",
    active: "Active",
    inactive: "Inactive",
  },
  "Pages": {
    dashboard: {
      title: "Dashboard",
      description: "Manage projects and customer engagements.",
      newWorkspace: "New Workspace",
    },
    departments: {
      title: "Departments",
      description: "Organize employees into departments.",
      addDepartment: "Add Department",
    },
    employees: {
      title: "Employees",
      description: "Manage user accounts and MCP access tokens.",
      addEmployee: "Add Employee",
    },
    roles: {
      title: "Roles",
      description: "Define permission sets.",
      createRole: "Create Role",
    },
    projects: {
      title: "Projects",
      description: "Manage cross-functional knowledge contexts.",
    },
    workspaces: {
      title: "Workspaces",
      description: "Manage projects and customer engagements.",
    },
    knowledge: {
      title: "Knowledge Base",
      description: "Manage and organize documents.",
      uploadDocument: "Upload Document",
      addCategory: "Add Category",
    },
    wiki: {
      title: "Knowledge Wiki",
      description: "Compiled knowledge from documents.",
      wikiIsEmpty: "Wiki is empty",
      wikiIsEmptyDesc: "Upload documents to start building wiki.",
    },
    profile: {
      title: "Profile",
      description: "Manage your account settings.",
      updatePassword: "Update Password",
    },
    settings: {
      title: "Settings",
      description: "Configure AI providers.",
      llmProvider: "LLM Provider",
      visionProvider: "Vision Provider",
    },
    audit: {
      title: "Audit Log",
      description: "Review access control decisions.",
      refresh: "Refresh",
    },
    guide: {
      title: "Help Center",
      description: "User guides and documentation.",
    },
    skills: {
      title: "AI Skills",
      description: "Manage and deploy skill packages.",
    },
  },
  "Dialogs": {
    createDepartment: "Create Department",
    editDepartment: "Edit Department",
    createEmployee: "Add Employee",
    editEmployee: "Edit Employee",
    createRole: "Create Role",
    editRole: "Edit Role",
    newWorkspace: "New Workspace",
    editWorkspace: "Edit Workspace",
    createKnowledgeType: "Create Knowledge Type",
    editKnowledgeType: "Edit Knowledge Type",
    uploadDocument: "Upload Document",
    editSkill: "Edit Skill",
    addTags: "Save Tags",
  },
  "Messages": {
    saveFailed: "Save failed",
    deleteFailed: "Delete failed",
    loadFailed: "Failed to load",
    uploadFailed: "Upload failed",
    actionFailed: "Action failed",
    loginFailed: "Login failed",
    passwordRequired: "Password is required",
    nameRequired: "Name is required",
    noDepartments: "No departments",
    noEmployees: "No employees",
    noRoles: "No roles",
    noWorkspaces: "No workspaces yet",
    noDocuments: "No documents found",
    noAuditLogs: "No audit logs found",
    noMembers: "No members yet",
    searchNoResults: "No results found",
    passwordChanged: "Password changed successfully",
  },
  "Table": {
    name: "Name",
    email: "Email",
    role: "Role",
    department: "Department",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    delete: "Delete",
    deactivate: "Deactivate",
    activate: "Activate",
  },
  "Form": {
    name: "Name",
    description: "Description",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    role: "Role",
    department: "Department",
    customRole: "Custom Role",
    knowledgeType: "Knowledge Type",
    scope: "Scope",
    global: "Global",
    workspace: "Workspace",
    enterName: "Enter name",
    enterEmail: "Enter email",
    enterPassword: "Enter password",
    selectRole: "Select role",
    selectDepartment: "Select department",
    optionalDescription: "Optional description...",
    min6Chars: "Min 6 characters",
    min8Chars: "Min 8 characters",
  },
};

const translations: Record<string, TranslationMap> = {
  vi: viTranslations,
  en: enTranslations,
};

type I18nContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, fallback?: string) => string;
  tNav: (key: string, fallback?: string) => string;
  tCommon: (key: string, fallback?: string) => string;
  tPages: (page: string, key: string, fallback?: string) => string;
  tDialogs: (key: string, fallback?: string) => string;
  tMessages: (key: string, fallback?: string) => string;
  tTable: (key: string, fallback?: string) => string;
  tForm: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("vi");
  const t = useCallback((key: string, fallback?: string): string => {
    const keys = key.split(".");
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? fallback ?? key;
  }, [locale]);

  const tNav = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Navigation?.[key] ?? fallback ?? key;
  }, [locale]);

  const tCommon = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Common?.[key] ?? fallback ?? key;
  }, [locale]);

  const tPages = useCallback((page: string, key: string, fallback?: string): string => {
    return translations[locale]?.Pages?.[page]?.[key] ?? fallback ?? key;
  }, [locale]);

  const tDialogs = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Dialogs?.[key] ?? fallback ?? key;
  }, [locale]);

  const tMessages = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Messages?.[key] ?? fallback ?? key;
  }, [locale]);

  const tTable = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Table?.[key] ?? fallback ?? key;
  }, [locale]);

  const tForm = useCallback((key: string, fallback?: string): string => {
    return translations[locale]?.Form?.[key] ?? fallback ?? key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tNav, tCommon, tPages, tDialogs, tMessages, tTable, tForm }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}