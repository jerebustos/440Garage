import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface QuoteEmailTemplateProps {
  customerEmail: string;
  customerName?: string;
  cartItems: any[];
  totalPrice: number;
}

export const QuoteEmailTemplate = ({
  customerEmail,
  customerName = "Cliente",
  cartItems,
  totalPrice,
}: Readonly<QuoteEmailTemplateProps>) => (
  <Html>
    <Head />
    <Preview>Tu solicitud de cotización en 440Garage</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Solicitud de Cotización Recibida</Heading>
        <Text style={text}>Hola {customerName},</Text>
        <Text style={text}>
          Hemos recibido tu solicitud de cotización/reserva para los siguientes artículos.
          Nos pondremos en contacto contigo a la brevedad.
        </Text>
        
        <Section style={itemsSection}>
          {cartItems.map((item, i) => (
            <Text key={i} style={itemText}>
              • {item.name} - ${Number(item.price).toLocaleString('es-AR')}
            </Text>
          ))}
        </Section>
        
        <Hr style={hr} />
        <Text style={totalText}>Total estimado: ${Number(totalPrice).toLocaleString('es-AR')}</Text>
        <Hr style={hr} />
        
        <Text style={footer}>
          440Garage - Venta de Instrumentos Musicales
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#0a0a0a',
  color: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  color: '#d4af37',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '17px 0 0',
  textAlign: 'center' as const,
};

const text = {
  color: '#e2e8f0',
  fontSize: '16px',
  lineHeight: '24px',
};

const itemsSection = {
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const itemText = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '4px 0',
};

const totalText = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
};

const hr = {
  borderColor: '#333333',
  margin: '20px 0',
};

const footer = {
  color: '#888888',
  fontSize: '12px',
  textAlign: 'center' as const,
};
