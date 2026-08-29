#!/bin/bash
sed -i '331,372c\
                  {(() => {\
                    const path = location.pathname;\
                    let contextual: {label: string, icon: any, action: string}[] = [];\
                    if (path === "/") {\
                      contextual = [\
                        { label: "Berapa estimasi harga web e-commerce?", icon: Calculator, action: "send" },\
                        { label: "Beda custom design & template?", icon: Code2, action: "send" },\
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }\
                      ];\
                    } else if (path === "/portfolio") {\
                      contextual = [\
                        { label: "Gimana proses pengerjaannya?", icon: Clock, action: "send" },\
                        { label: "Berapa lama waktu pembuatannya?", icon: Clock, action: "send" },\
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }\
                      ];\
                    } else if (path === "/services") {\
                      contextual = [\
                        { label: "Apa fitur paket UMKM Starter?", icon: Code2, action: "send" },\
                        { label: "Apakah SEO sudah termasuk?", icon: TrendingUp, action: "send" },\
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }\
                      ];\
                    } else if (path === "/blog") {\
                      contextual = [\
                        { label: "Apa itu teknologi Agentic AI?", icon: Bot, action: "send" },\
                        { label: "Pentingkah skor Lighthouse 99+?", icon: TrendingUp, action: "send" },\
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }\
                      ];\
                    } else {\
                      contextual = [\
                        { label: "Konsultasi pembuatan website", icon: MessageCircle, action: "send" },\
                        { label: "Lihat portofolio terbaru", icon: TrendingUp, action: "send" },\
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }\
                      ];\
                    }\
                    return contextual.slice(0, 3);\
                  })().map((action, i) => (' src/components/organisms/FloatingAIAssistant.tsx
