/* ENVIRONMENT VARIABLES */
import { SMTP_USER, SMTP_PASSWORD } from './env.js'
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
} as SMTPTransport.Options)

export default transporter