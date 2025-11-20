import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { useCreateCustomer } from "@/cases/customers/hooks/use-customer";
import { supabase } from "@/lib/supabase-client";
import type { CustomerDTO } from "@/cases/customers/dtos/customer-dto";

export default function Register() {
    const navigate = useNavigate();
    const createCustomer = useCreateCustomer();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        zipcode: "",
        stateId: "",
        cityId: "",
    });
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signUpError) throw signUpError;

            createCustomer.mutate(
                { name: formData.name, address: formData.address, zipcode: formData.zipcode, authId: signUpData.user?.id, } as CustomerDTO,
                {
                    onSuccess: (createdCustomer) => {
                        localStorage.setItem('idCustommer', createdCustomer.id as string);
                        toast.success("Cadastro realizado com sucesso!");
                        navigate("/login");
                    },
                }
            );

        } catch (err: unknown) {
            console.error(err);

            const message =
                err instanceof Error ? err.message : "Erro ao cadastrar";

            toast.error(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Cadastro</CardTitle>
                    <CardDescription className="text-center">
                        Preencha o formulário abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                            </div>

                        </div>

                        <CardFooter className="flex-col gap-2 mt-10">
                            <Button type="submit"
                                disabled={createCustomer.isPending}
                                className="w-full cursor-pointer">
                                {createCustomer.isPending ? "Cadastrando..." : "Cadastrar"}
                            </Button>

                            <a href='/login'
                                className='self-center mt-3 text-sm text-primary hover:underline'>
                                Já possui conta? Faça login
                            </a>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}