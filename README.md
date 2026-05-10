![Arkon Banner](docs/assets/banner.png)

# Arkon - Trung Tâm Tri Thức AI Doanh Nghiệp

**Kết nối tri thức của tổ chức bạn với mọi AI Client. Tự lưu trữ, triển khai nội bộ.**

Arkon là lớp trung gian giữa tài liệu của bạn và các AI client của nhân viên. Tải lên quy trình vận hành, chính sách, thông số kỹ thuật sản phẩm và tài liệu nội bộ — Arkon tổng hợp chúng thành một wiki tri thức có cấu trúc và phục vụ trực tiếp cho Claude qua MCP. Mỗi nhân viên tự động nhận được đúng ngữ cảnh cần thiết, không cần sao chép thủ công.

[Hướng Dẫn Cài Đặt](docs/SETUP.md) · [Kiến Trúc](docs/ARCHITECTURE.md) · [Hệ Thống Wiki](docs/WIKI.md) · [MCP & Claude](docs/MCP.md) · [AI Skills](docs/SKILLS.md) · [Kiểm Soát Truy Cập](docs/ACCESS-CONTROL.md)

---

## Vấn Đề

Hầu hết các tổ chức triển khai AI theo từng nhóm riêng lẻ, không có tri thức dùng chung, ngữ cảnh không nhất quán và không thể giám sát AI client đang làm việc với thông tin gì. Mỗi nhân viên phải tự dán tài liệu thủ công, lặp lại cùng một thông tin nền và nhận được các câu trả lời khác nhau tùy thuộc vào những gì họ nhớ đưa vào.

![Problem](docs/assets/Problem.png)

Arkon quản lý AI client như một tài nguyên tổ chức — không phải chatbot cá nhân.

---

## Cách Hoạt Động

![How it works](docs/assets/HowItWorks.png)

Tri thức được tích lũy theo thời gian. Mỗi tài liệu bạn thêm vào sẽ làm phong phú thêm wiki hiện có thay vì tạo ra các mảnh rời rạc. Khi nhân viên hỏi Claude một câu hỏi, câu trả lời đã được tổng hợp từ hàng chục nguồn.

---

## Tính Năng

### Wiki Tri Thức
Tài liệu được tổng hợp thành wiki liên kết bền vững bởi một LLM agent — không chỉ đơn thuần lập chỉ mục. Mỗi trang bao gồm một thực thể, khái niệm hoặc chủ đề cụ thể. Các trang tham chiếu lẫn nhau. Wiki ngày càng thông minh hơn khi có thêm tài liệu mới.

- Trình duyệt wiki ba bảng: cây trang, nội dung, liên kết ngược & liên kết xuôi
- Tìm kiếm toàn văn và ngữ nghĩa
- Trực quan hóa đồ thị tri thức
- Phân loại theo loại tri thức (Quy trình, Sản phẩm, Chính sách Nhân sự, v.v.)
- Lịch sử phiên bản và khôi phục cho mỗi trang
- Quy trình đề xuất nháp → xem xét biên tập → phê duyệt

### Không Gian Làm Việc (Workspaces)
Ngữ cảnh tri thức liên chức năng cho các dự án, khách hàng hoặc sáng kiến.

Tạo workspace → thêm thành viên từ bất kỳ bộ phận nào → đính kèm tài liệu. Mỗi workspace có wiki, danh sách tài liệu và danh sách thành viên riêng. Thành viên tự động thấy tri thức workspace qua Claude.

- Phân quyền thành viên theo vai trò: Xem, Đóng góp, Biên tập, Quản trị
- Quản lý wiki và tài liệu theo phạm vi
- Người đóng góp đề xuất chỉnh sửa wiki; biên tập viên xem xét và phê duyệt

### AI Skills
Tải lên các gói agent tùy chỉnh và cung cấp cho nhân viên qua Claude. Skills được quản lý phiên bản, phân theo bộ phận và phân phối qua MCP.

### Máy Chủ MCP
Nhân viên kết nối Claude Desktop (hoặc bất kỳ MCP client nào) với Arkon bằng token cá nhân. Claude được truy cập wiki tổng hợp, tài liệu nguồn gốc và AI skills — tất cả được lọc theo phạm vi quyền của nhân viên.

→ Xem [MCP & Claude](docs/MCP.md) để tham khảo đầy đủ các công cụ.

### Kiểm Soát Truy Cập
RBAC chi tiết ở cấp bộ phận cộng với vai trò thành viên workspace. Quản trị viên định nghĩa vai trò với quyền hạn chi tiết; nhân viên kế thừa quyền truy cập theo bộ phận hoặc phân công trực tiếp.

→ Xem [Kiểm Soát Truy Cập](docs/ACCESS-CONTROL.md) để tham khảo mô hình quyền đầy đủ.

---

## Khởi Động Nhanh (Docker)

**Yêu cầu:** Docker, Docker Compose, API key của nhà cung cấp AI (Google, OpenAI hoặc Anthropic).

```bash
git clone https://github.com/nduckmink/arkon.git
cd arkon
cp .env.docker.example .env.docker
```

Chỉnh sửa `.env.docker` — thiết lập tối thiểu:

```env
SECRET_KEY=<chạy: python -c "import secrets; print(secrets.token_urlsafe(32))">
DEFAULT_ADMIN_EMAIL=admin@yourcompany.com
DEFAULT_ADMIN_PASSWORD=your-secure-password
```

```bash
docker compose --env-file .env.docker up -d --build
```

Mở **http://localhost:3119** và đăng nhập bằng thông tin quản trị viên.

Vào **Settings** → cấu hình embedding model, LLM và (tùy chọn) vision model. Sau đó tải lên tài liệu đầu tiên từ **Knowledge Base**.

→ Xem [Hướng Dẫn Cài Đặt](docs/SETUP.md) để xem hướng dẫn đầy đủ bao gồm chế độ phát triển.

---

## Kết Nối Claude

Sau khi tạo tài khoản nhân viên và tạo MCP token:

```json
{
  "mcpServers": {
    "arkon": {
      "url": "https://your-arkon-server/mcp",
      "headers": {
        "Authorization": "Bearer ark_xxxxxxxxxxxx"
      }
    }
  }
}
```

Thêm vào `claude_desktop_config.json` và khởi động lại Claude Desktop. Tri thức tổng hợp của nhân viên sẽ ngay lập tức khả dụng.

→ Xem [MCP & Claude](docs/MCP.md) để xem hướng dẫn cài đặt đầy đủ và tham khảo công cụ.

---

## Kiến Trúc

![Arkon System Design](docs/assets/Architecture.png)

**Công nghệ:** FastAPI · PostgreSQL + pgvector · Redis (arq) · MinIO · Next.js · Tailwind CSS

**Nhà cung cấp AI (tùy chọn):** Google · OpenAI · Anthropic · Ollama · Voyage · Cohere

**Mạng ngoài:** chỉ nhà cung cấp AI đã cấu hình. Không có telemetry, không có cuộc gọi ngoài.

→ Xem [Kiến Trúc](docs/ARCHITECTURE.md) để xem phân tích kỹ thuật đầy đủ.

---

## Lộ Trình

- [x] LLM Wiki Agent — tài liệu được tổng hợp thành wiki liên kết bền vững
- [x] Trình duyệt wiki — bố cục ba bảng với trực quan hóa đồ thị
- [x] Máy chủ MCP với truy cập tri thức theo phạm vi
- [x] Pipeline nhập liệu — PDF, DOCX, DOC, URL, hình ảnh với chú thích vision
- [x] Workspaces — wiki, tài liệu và thành viên theo phạm vi
- [x] Hệ thống nháp & chỉnh sửa wiki — đề xuất, xem xét, phê duyệt, khôi phục
- [x] AI Skills — gói agent được quản lý phiên bản, phân theo bộ phận
- [x] RBAC đầy đủ — quyền bộ phận + vai trò thành viên workspace
- [x] Nhật ký kiểm toán
- [ ] Tìm kiếm Regex cho Con người và AI
- [ ] Arkon CLI — thiết lập nhân viên một lệnh
- [ ] Hệ thống thông báo cho yêu cầu xem xét nháp
- [ ] Bảng phân tích sử dụng

---

## Giấy Phép

Arkon được cấp phép theo [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).

Miễn phí sử dụng cho công cụ nội bộ, nghiên cứu, dự án cá nhân và tổ chức phi lợi nhuận.

**Cần giấy phép thương mại hoặc tích hợp tùy chỉnh?** Chúng tôi hỗ trợ các tổ chức tích hợp Claude, AI agent tùy chỉnh và máy chủ MCP vào hạ tầng hiện có — từ kết nối cơ sở dữ liệu nội bộ và hệ thống kế thừa đến xây dựng agent chuyên biệt cho quy trình kinh doanh cụ thể.

[Liên Hệ →](https://bitsness.vn)

---

[![Star History Chart](https://api.star-history.com/svg?repos=nduckmink/arkon&type=Date)](https://star-history.com/#nduckmink/arkon&Date)
