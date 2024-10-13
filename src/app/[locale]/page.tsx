import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("home");
    return (
        <section className="py-24">
            <div className="container">
                <section className="mx-auto max-w-6xl items-center justify-between text-2xl font-bold">
                    <h1>{t("title")}</h1>
                    <p>{t("description")}</p>
                </section>
            </div>
        </section>
    );
}
