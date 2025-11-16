import { useCustomers, useUpdateCustomer } from "@/cases/customers/hooks/use-customer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function AccountLayout() {
    const { data: customers, isLoading } = useCustomers();
    const { mutate: updateCustomer, isPending } = useUpdateCustomer();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    const customer = customers?.find((c) => c.userId === userId);

    const [formData, setFormData] = useState({
        name: "",
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!isLoading && customer && !initialized) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: customer.name ?? "",
            });

            setInitialized(true);
        }
    }, [isLoading, customer, initialized]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer) return;

        updateCustomer({
            id: customer.id!,
            customer: {
                ...customer,
                name: formData.name,
            },
        });
    };

    if (!initialized) {
        return (
            <div className="p-8">
                <p>Carregando dados do usuário...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-8">
                    Olá <span className="font-bold text-blue-600">{customer ? customer.name : "usuário"}</span>!
                </h1>

                {/* FORMULÁRIO SOMENTE COM NOME */}
                <div className="flex flex-col mb-8">
                    <h2 className="text-xl font-semibold mb-8">Meus dados</h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Salvando..." : "Salvar alterações"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}