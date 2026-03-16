'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { registerSchema } from '@/lib/Schema/schema';
import { getClass } from '@/services/ApiServices';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Lock, Calendar, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface myData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
}

export default function Register() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function sendData(myData: myData) {
    setIsSubmitting(true);
    const userType = {
      username: myData.name,
      email: myData.email,
      password: myData.password,
      gender: myData.gender,
      phoneCountryIso2: 'EG',
      phoneNumber: myData.phoneNumber,
    };

    const registerResponse = await getClass.Register(userType, 'customer');

    if (registerResponse.message) {
      setIsRegistered(false);
      setError(registerResponse.message);
      setIsSubmitting(false);
    } else {
      setIsRegistered(true);
      setError('');
      reset();
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }

  const inputClass =
    'w-full h-14 rounded-2xl border-transparent bg-slate-50 px-5 font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-medium focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20';

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans selection:bg-blue-500 selection:text-white sm:px-6 lg:px-8">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-2xl rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 duration-500 sm:p-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <User size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Create an Account</h1>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Join PRISM to unlock exclusive features and fast checkout.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(sendData)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="text" placeholder="John Doe" className={`${inputClass} pl-11`} {...register('name')} />
              </div>
              {errors.name?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.name.message as string}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className={`${inputClass} pl-11`}
                  {...register('email')}
                />
              </div>
              {errors.email?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.email.message as string}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2 sm:col-span-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="tel"
                  placeholder="+20 100 000 0000"
                  className={`${inputClass} pl-11`}
                  {...register('phoneNumber')}
                />
              </div>
              {errors.phoneNumber?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.phoneNumber.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={`${inputClass} pl-11`}
                  {...register('password')}
                />
              </div>
              {errors.password?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.password.message as string}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={`${inputClass} pl-11`}
                  {...register('rePassword')}
                />
              </div>
              {errors.rePassword?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.rePassword.message as string}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="date" className={`${inputClass} pl-11 uppercase`} {...register('dateOfBirth')} />
              </div>
              {errors.dateOfBirth?.message && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.dateOfBirth.message as string}</p>
              )}
            </div>

            {/* Gender (Controller Preserved) */}
            <div className="space-y-2">
              <label className="pl-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                      <SelectItem value="male" className="cursor-pointer rounded-xl font-bold">
                        Male
                      </SelectItem>
                      <SelectItem value="female" className="cursor-pointer rounded-xl font-bold">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="pl-1 text-[10px] font-bold text-red-500">{errors.gender.message as string}</p>
              )}
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            {error && (
              <div className="animate-in slide-in-from-bottom-2 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
                <AlertTriangle size={18} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {isRegistered && (
              <div className="animate-in slide-in-from-bottom-2 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-600">
                <CheckCircle2 size={18} className="shrink-0" />
                <p>Account registered successfully! Redirecting to login...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isRegistered}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-5 text-lg font-black text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting && !isRegistered ? 'Creating Account...' : isRegistered ? 'Success!' : 'Create Account'}
              {!isSubmitting && !isRegistered && <ArrowRight size={20} />}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-black text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
