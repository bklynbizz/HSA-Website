import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import AIChatAvatar from '@/components/avatar/AIChatAvatar'

// Public Pages
import HomePage from '@/pages/public/HomePage'
import AboutPage from '@/pages/public/AboutPage'
import ServicesPage from '@/pages/public/ServicesPage'
import HowItWorksPage from '@/pages/public/HowItWorksPage'
import TestimonialsPage from '@/pages/public/TestimonialsPage'

import ContactPage from '@/pages/public/ContactPage'
import FAQPage from '@/pages/public/FAQPage'
import GetOfferPage from '@/pages/public/GetOfferPage'
import BookConsultationPage from '@/pages/public/BookConsultationPage'
import PrivacyPage from '@/pages/public/PrivacyPage'
import TermsPage from '@/pages/public/TermsPage'

// Admin Pages
import DashboardPage from '@/pages/admin/DashboardPage'
import LeadsPage from '@/pages/admin/LeadsPage'
import LeadDetailPage from '@/pages/admin/LeadDetailPage'
import ConsultationsPage from '@/pages/admin/ConsultationsPage'

import TestimonialsManagePage from '@/pages/admin/TestimonialsManagePage'
import FAQManagePage from '@/pages/admin/FAQManagePage'
import MediaPage from '@/pages/admin/MediaPage'
import SettingsPage from '@/pages/admin/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="what-we-buy" element={<ServicesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />

          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="get-offer" element={<GetOfferPage />} />
          <Route path="book-consultation" element={<BookConsultationPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="leads/:id" element={<LeadDetailPage />} />
          <Route path="consultations" element={<ConsultationsPage />} />

          <Route path="testimonials" element={<TestimonialsManagePage />} />
          <Route path="faqs" element={<FAQManagePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      {/* AI Chat Avatar — visible on all public pages */}
      <AIChatAvatar />
    </BrowserRouter>
  )
}
