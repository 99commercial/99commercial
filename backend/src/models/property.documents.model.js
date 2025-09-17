import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertyDocumentsSchema = new Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    documents: [{
      document_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      file_url: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Must be a valid URL'],
      },
      file_name: {
        type: String,
        required: true,
        trim: true,
      },
      file_size: {
        type: Number,
        required: true,
        min: 0,
        max: 15728640, // 15MB in bytes
      },
      mime_type: {
        type: String,
        enum: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        required: true,
      },
      document_type: {
        type: String,
        enum: [
          'Floor Plan',
          'EPC Certificate',
          'Planning Permission',
          'Title Deeds',
          'Lease Agreement',
          'Survey Report',
          'Insurance Certificate',
          'Health & Safety Certificate',
          'Fire Safety Certificate',
          'Other',
        ],
        required: true,
      },
      show_to_site_users: {
        type: Boolean,
        default: true,
        description: 'Whether to show this document to public site users',
      },
      upload_status: {
        type: String,
        enum: ['Processing', 'Completed', 'Failed'],
        default: 'Processing',
      },
      uploaded_at: {
        type: Date,
        default: Date.now,
      },
      download_count: {
        type: Number,
        default: 0,
        min: 0,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
propertyDocumentsSchema.index({ property_id: 1 });
propertyDocumentsSchema.index({ 'documents.document_type': 1 });
propertyDocumentsSchema.index({ 'documents.show_to_site_users': 1 });
propertyDocumentsSchema.index({ 'documents.upload_status': 1 });

// Virtual for public documents
propertyDocumentsSchema.virtual('public_documents').get(function() {
  return this.documents.filter(doc => doc.show_to_site_users && doc.upload_status === 'Completed');
});

// Virtual for completed documents count
propertyDocumentsSchema.virtual('completed_documents_count').get(function() {
  return this.documents.filter(doc => doc.upload_status === 'Completed').length;
});

export default model('property_documents', propertyDocumentsSchema);
