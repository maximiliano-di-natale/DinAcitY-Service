import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { CategoryId, ServiceOffer, Business } from '../../types';
import { CATEGORIES } from '../../data/mockBusinesses';
import { DinacityLogo } from '../common/DinacityLogo';

interface BusinessRegistrationFormProps {
  onSubmit: (data: {
    name: string;
    tagline: string;
    category: CategoryId;
    description: string;
    address: string;
    city: string;
    whatsapp: string;
    phone?: string;
    email?: string;
    instagram?: string;
    website?: string;
    hours: Business['hours'];
    services: ServiceOffer[];
    imageUrl?: string;
  }) => void;
  onCancel?: () => void;
}

export const BusinessRegistrationForm: React.FC<BusinessRegistrationFormProps> = ({
  onSubmit,
  onCancel
}) => {
  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<CategoryId>('mecanica');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Hours
  const [weekdaysHours, setWeekdaysHours] = useState('Lunes a Viernes: 09:00 a 18:00');
  const [saturdayHours, setSaturdayHours] = useState('Sábados: 09:00 a 13:00');
  const [sundayHours, setSundayHours] = useState('Domingos: Cerrado');

  // Services offered
  const [services, setServices] = useState<Array<{ name: string; description: string; priceEstimate: string }>>([
    { name: '', description: '', priceEstimate: '' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddService = () => {
    setServices([...services, { name: '', description: '', priceEstimate: '' }]);
  };

  const handleRemoveService = (index: number) => {
    if (services.length === 1) return;
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'El nombre de la empresa o negocio es obligatorio.';
    if (!tagline.trim()) errs.tagline = 'Una breve frase resumen o eslogan es requerida.';
    if (!description.trim()) errs.description = 'Cuéntale a los usuarios qué hace tu negocio.';
    if (!address.trim()) errs.address = 'La dirección o zona de atención es necesaria.';
    if (!whatsapp.trim()) {
      errs.whatsapp = 'El número de WhatsApp es imprescindible para que los usuarios te contacten.';
    } else if (whatsapp.replace(/\D/g, '').length < 8) {
      errs.whatsapp = 'Ingresa un número válido con código de país/área (ej: 5491144332211).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    const cleanedServices: ServiceOffer[] = services
      .filter(s => s.name.trim() !== '')
      .map((s, idx) => ({
        id: `srv-${Date.now()}-${idx}`,
        name: s.name.trim(),
        description: s.description.trim() || undefined,
        priceEstimate: s.priceEstimate.trim() || undefined
      }));

    onSubmit({
      name,
      tagline,
      category,
      description,
      address,
      city: city.trim() || 'Zona de Cobertura',
      whatsapp,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      instagram: instagram.trim() || undefined,
      website: website.trim() || undefined,
      hours: {
        weekdays: weekdaysHours,
        saturday: saturdayHours.trim() || undefined,
        sunday: sundayHours.trim() || undefined
      },
      services: cleanedServices,
      imageUrl: imageUrl.trim() || undefined
    });

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          ¡Negocio Publicado con Éxito!
        </h3>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Tu empresa ya está visible en el catálogo de Dinacity Service. Los usuarios podrán encontrarte, conocer tus servicios y escribirte directamente a tu WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      
      {/* Header Form */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-[#0056D6] font-bold text-xs uppercase tracking-wider mb-1">
          <DinacityLogo size="xs" variant="icon-plain" />
          <span>Alta de Prestador en la Red Oficial</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Publica tus Servicios en Dinacity Service
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Completa el perfil de tu empresa para comenzar a recibir solicitudes directas de clientes en tu zona.
        </p>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <span>1. Información General del Negocio</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nombre de la Empresa o Emprendimiento *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Taller Mecánico San Martín"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Rubro / Categoría Principal *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white font-medium text-slate-800"
            >
              {CATEGORIES.filter(c => c.id !== 'todos').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Lema o Frase Corta de Presentación *
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Ej: Especialistas en inyección electrónica y service general con repuestos originales."
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.tagline ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none`}
          />
          {errors.tagline && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.tagline}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Descripción Detallada del Servicio *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu trayectoria, métodos de trabajo, garantías, marcas que trabajas y cómo ayudas al cliente..."
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.description ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none`}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.description}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            URL de Foto o Logo (Opcional - Imagen de alta calidad)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-3 text-slate-400">
                <ImageIcon className="w-4 h-4" />
              </span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/mifoto.jpg (si no tienes, asignaremos una profesional según tu rubro)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location & Contact (WhatsApp is crucial!) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span>2. Vías de Contacto Directo & Ubicación</span>
        </h3>

        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-800 leading-relaxed">
            <strong>¿Cómo funciona la intermediación?</strong> Cuando un usuario hace clic en <em>"Contactar"</em>, se abrirá WhatsApp con tu número registrado y un mensaje automático presentándose desde Dinacity Service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              WhatsApp para Clientes (con código de país) *
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ej: 5491144332211 (sin signos + ni guiones)"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none`}
            />
            {errors.whatsapp && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.whatsapp}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Teléfono Fijo / Alternativo (Opcional)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: 11 4433-2211"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Dirección o Cobertura Domiciliaria *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Av. Rivadavia 2400 (o 'Atención a Domicilio')"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-300'} text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Ciudad / Zona / Barrio
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Zona Norte / San Isidro"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Comercial (Opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contacto@minegocio.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Instagram (Opcional)
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@minegocio_ok"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Página Web (Opcional)
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://minegocio.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-600" />
          <span>3. Días y Horarios de Atención</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Lunes a Viernes
            </label>
            <input
              type="text"
              value={weekdaysHours}
              onChange={(e) => setWeekdaysHours(e.target.value)}
              placeholder="Ej: 08:30 a 18:30"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Sábados
            </label>
            <input
              type="text"
              value={saturdayHours}
              onChange={(e) => setSaturdayHours(e.target.value)}
              placeholder="Ej: 09:00 a 13:00 (o Cerrado)"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Domingos / Feriados / Urgencias
            </label>
            <input
              type="text"
              value={sundayHours}
              onChange={(e) => setSundayHours(e.target.value)}
              placeholder="Ej: Urgencias 24h o Cerrado"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>4. Servicios que Ofreces</span>
          </h3>

          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Servicio</span>
          </button>
        </div>

        <div className="space-y-3">
          {services.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Servicio #{idx + 1}
                </span>
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Eliminar este servicio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={srv.name}
                    onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                    placeholder="Nombre del servicio (Ej: Cambio de Aceite y Filtros)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={srv.priceEstimate}
                    onChange={(e) => handleServiceChange(idx, 'priceEstimate', e.target.value)}
                    placeholder="Precio est. (Ej: Desde $25.000)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={srv.description}
                    onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
                    placeholder="Breve detalle de lo que incluye el servicio (Opcional)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all"
        >
          <Sparkles className="w-5 h-5 text-emerald-200" />
          <span>Publicar Negocio en Dinacity</span>
        </button>
      </div>

    </form>
  );
};
