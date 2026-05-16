import { ReactNode, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function ContactBlock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tn = name.trim(), te = email.trim(), tm = message.trim();
    if (!tn || tn.length > 100) { toast({ title: "Please add your name", description: "Up to 100 characters." }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(te) || te.length > 255) { toast({ title: "Please enter a valid email" }); return; }
    if (!tm || tm.length > 2000) { toast({ title: "Add a short message", description: "Up to 2000 characters." }); return; }
    setSending(true);
    const subject = encodeURIComponent(`Hello from ${tn}`);
    const body = encodeURIComponent(`${tm}\n\n— ${tn} (${te})`);
    window.location.href = `mailto:geetika@example.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 800);
    toast({ title: "Opening your mail client…" });
  };

  const channels = [
    { icon: Mail, label: "Email", value: "geetika@example.com", href: "mailto:geetika@example.com" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/geetika-gehlot", href: "https://www.linkedin.com/" },
    { icon: Github, label: "GitHub", value: "@geetika", href: "https://github.com/" },
    { icon: MapPin, label: "Based in", value: "Montréal, QC" },
  ];

  return null;
}
