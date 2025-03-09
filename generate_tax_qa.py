from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch

model_path = "/home/swastim01/TaxEase/models/openhermes"

# Load model with 4-bit quantization
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",  # Automatically use GPU if available
    load_in_4bit=True,  # Use 4-bit quantization
)

tokenizer = AutoTokenizer.from_pretrained(model_path)

# Create pipeline
qa_pipeline = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Example Questions
questions = [
    "What is the standard deduction for salaried employees?",
    "How does the new tax regime compare to the old one?",
    "What are the tax-saving options under Section 80C?",
    "Is freelance income taxable in India?",
    "How can I calculate my total taxable income?",
    "What deductions are available under Section 80D for health insurance?",
    "How do I claim HRA (House Rent Allowance) exemption?",
    "Are there any tax benefits for home loans under Section 80EE?",
    "What are the tax implications of investing in mutual funds?",
    "How does the presumptive taxation scheme under Section 44ADA work?",
    "Can I claim deductions for education loans under Section 80E?",
    "What is the tax treatment of EPF (Employee Provident Fund) withdrawals?",
    "How does Leave Travel Allowance (LTA) work in taxation?",
    "Are donations to charitable organizations tax-deductible?",
    "How is gratuity taxed for salaried employees?",
        "Do I need to pay GST if I am a freelancer?",
    "What is the penalty for late filing of income tax returns?",
    "Are stock market gains taxable, and under which sections?",
    "Can I claim tax benefits on medical expenses for senior citizens?",
    "What is the process for filing an income tax return (ITR) in India?",
    "What are the tax exemptions available under Section 10?",
    "How is capital gains tax calculated for the sale of property?",
    "What are the differences between long-term and short-term capital gains tax?",
    "How can I reduce my tax liability as a freelancer?",
    "What is the maximum limit for deductions under Section 80C?",
    "How does tax loss harvesting work in India?",
    "Can I claim deductions for rent paid if I don't receive HRA?",
    "What are the tax benefits available for startups under the Income Tax Act?",
    "How is agricultural income taxed in India?",
    "Are there any tax benefits for senior citizens under the new tax regime?",
    "What is the penalty for non-disclosure of foreign assets in income tax returns?",
    "How is dividend income taxed under the current tax regime?",
    "What is the TDS (Tax Deducted at Source) rate for different types of income?",
    "How can I check my Form 26AS for tax credit details?",
    "What is the process to correct errors in a filed income tax return?",
    "Can I claim tax benefits for home rent if I am self-employed?",
    "What is the procedure for filing a revised income tax return?",
    "Are employer contributions to NPS (National Pension System) taxable?",
    "What tax benefits are available under Section 80G for donations?",
    "How do I calculate advance tax liability for self-employed professionals?",
    "What are the latest income tax slab rates for individuals in India?",
    "How does the Goods and Services Tax (GST) impact freelancers and small businesses?",
    "What are the tax implications of investing in stocks and mutual funds?",
    "Can I claim a deduction for home loan interest under both Section 80C and Section 24?",
    "What are the different types of allowances that are tax-exempt for salaried employees?",
    "How can I save tax on capital gains from the sale of a house property?",
    "What is the difference between tax exemption, tax deduction, and tax rebate?",
    "What are the tax benefits of investing in the National Pension System (NPS)?",
    "How can I avoid double taxation on foreign income earned by an Indian resident?",
    "What are the tax rules for crypto trading and investments in India?",
    "How do I calculate depreciation on assets for income tax purposes?",
    "What are the tax implications of gifting money or property to family members?",
    "How does the Income Tax Department track high-value transactions?",
    "What are the consequences of missing the income tax return (ITR) filing deadline?",
    "What are the tax benefits available for women entrepreneurs in India?",
    "What are the different ways to claim HRA and home loan deductions together?",
    "How do I report foreign bank accounts and assets in my income tax return?",
    "What are the tax rules for income earned from YouTube, blogging, or social media?",
    "Can I claim a deduction for medical insurance premiums under Section 80D?",
    "What are the tax benefits for senior citizens and super senior citizens in India?",
    "What are the penalties for not linking PAN with Aadhaar?",
    "How can I correct errors in my filed income tax return?",
    "What are the tax benefits of donating to charities under Section 80G?",
    "How do I file an ITR if I have multiple sources of income?",
    "What are the tax implications of receiving an inheritance in India?",
    "How does the tax treatment differ for fixed deposits and savings accounts?",
    "What are the tax deductions available for educational expenses and student loans?",
    "What is Form 16, and how do I use it while filing my ITR?",
    "How can I claim tax benefits if I am a first-time homebuyer?",
    "What are the tax rules for agricultural income in India?",
    "How do I report losses from stock market trading in my income tax return?",
    "What are the exemptions available for gratuity and leave encashment?",
    "How does the presumptive taxation scheme benefit small businesses and professionals?",
    "What is the process for filing a revised income tax return?",
    "How can I check my income tax refund status?",
    "What is the impact of inflation on income tax brackets and deductions?",
    "Are gifts received from friends taxable in India?",
    "What are the tax benefits available for differently-abled individuals under Section 80U?",
    "How do I handle tax compliance if I move abroad for work?",
    "What are the rules for voluntary disclosure of undisclosed income?",
    "How can I reduce my tax liability legally in India?",
    "What is the difference between tax deduction and tax exemption?",
    "Are cryptocurrencies taxable in India?",
    "How does GST work, and who needs to register for it?",
    "What are the tax benefits of investing in NPS (National Pension System)?",
    "How can I claim HRA if I live with my parents?",
    "What is Advance Tax, and who needs to pay it?",
    "What are the tax implications of earning income from YouTube or Instagram?",
    "How can senior citizens save taxes under the Income Tax Act?",
    "What happens if I do not file my ITR before the deadline?",
    "How do I claim a deduction for medical insurance under Section 80D?",
    "What is the penalty for late payment of income tax?",
    "Can I file my income tax return without Form 16?",
    "What are the tax rules for receiving dividends from stocks and mutual funds?",
    "How does tax apply to rental income in India?",
    "How can I rectify a mistake in my already filed GST return?",
    "What is Section 87A, and how can I claim a rebate under it?",
    "Are work-from-home expenses tax deductible?",
    "How do I report foreign income and assets while filing my taxes?",
    "What are the tax-saving options for women entrepreneurs in India?",
    "What are the most commonly overlooked tax deductions in India?",
    "How can I check if I have missed any eligible tax benefits?",
    "Are there any lesser-known exemptions under Section 80C apart from PPF and ELSS?",
    "Can I claim deductions for tuition fees paid for my children under the Income Tax Act?",
    "How do I claim tax benefits on home loan principal and interest repayment?",
    "What tax deductions can be claimed for donations to charitable organizations?",
    "Can I claim deductions for medical expenses not covered by insurance?",
    "How do I claim deductions on education loans under Section 80E?",
    "Are there any tax benefits available for first-time homebuyers in India?",
    "Can I get tax benefits for expenses on disabled dependents under Section 80DD?",
    "Are preventive health check-ups tax-deductible under Section 80D?",
    "Can I claim tax benefits for rent paid if I do not receive HRA from my employer?",
    "Is there any tax benefit for interest earned on savings accounts or FDs?",
    "How do I claim deductions on investments in infrastructure bonds?",
    "What are the tax benefits of Sukanya Samriddhi Yojana for my daughter?",
    "Are expenses on internet, phone, or work-from-home setups tax-deductible?",
    "How can senior citizens reduce their taxable income through special deductions?",
    "Can I claim deductions on repayment of principal and interest for multiple home loans?",
    "Are self-employed professionals eligible for tax deductions on office expenses?",
    "What are the tax benefits of voluntary EPF contributions for salaried employees?",
    "How can I optimize my salary structure to reduce my tax liability?",
    "What are the tax implications of investing in stocks and mutual funds?",
    "How is capital gains tax calculated on the sale of property in India?",
    "What are the tax benefits of investing in National Pension System (NPS)?",
    "Can I save taxes by investing in government bonds or sovereign gold bonds?",
    "What tax benefits are available for startup founders and freelancers?",
    "How does taxation work for cryptocurrency and digital assets in India?",
    "How do I claim tax benefits for expenses incurred while working remotely?",
    "Can I get a tax deduction for purchasing an electric vehicle?",
    "How does tax apply to foreign income earned by Indian residents?",
    "What are the tax implications of receiving gifts from relatives and non-relatives?",
    "How do I avoid double taxation if I work abroad and pay Indian taxes?",
    "Are there any special tax benefits for women taxpayers in India?",
    "What tax benefits are available for senior citizens beyond Section 80C?",
    "How do I claim a refund for excess TDS deducted from my salary?",
    "What are the tax implications of transferring property within family members?",
    "Can I claim a tax deduction for home loan prepayment?",
    "How do I ensure my investments are tax-efficient?",
    "What tax-saving options are available for high-income earners?",
    "How can I legally reduce my taxable income to the lowest possible bracket?",
    "How can I legally reduce my tax burden using tax-harvesting strategies?",
    "What are the most common tax deductions people forget to claim?",
    "How does the tax on fixed deposit interest impact my total earnings?",
    "What are the tax benefits of investing in health insurance beyond Section 80D?",
    "Can I claim tax benefits for education loans taken for my children?",
    "How does income tax apply to rental income from multiple properties?",
    "What are the penalties for missing tax filing deadlines, and how can I avoid them?",
    "How do I claim a deduction for donations made to charities under Section 80G?",
    "What are the tax implications of switching jobs multiple times in a year?",
    "Can I save taxes by gifting money to my family members?",
    "How does the LTA (Leave Travel Allowance) exemption work, and how can I maximize it?",
    "What are the tax-saving opportunities available for NRIs investing in India?",
    "How can I reduce capital gains tax while selling a property?",
    "What are the tax implications of earning from YouTube, blogging, or affiliate marketing?",
    "Can I claim deductions for expenses related to running a small business from home?",
    "What is the tax treatment of ESOPs (Employee Stock Ownership Plans) in India?",
    "How do I calculate and pay advance tax to avoid penalties?",
    "What are the best ways to structure my investments to minimize tax liability?",
    "Can I get tax benefits for expenses incurred on medical treatment of a dependent?",
    "What are the tax exemptions available for agricultural income in India?"
]

# Function to generate answers
def generate_tax_answer(question):
    for attempt in range(3):  # Retry up to 3 times
        try:
            response = qa_pipeline(question, max_length=100, do_sample=True)
            return response[0]["generated_text"].replace(question, "").strip()  # Remove the question from output
        except Exception as e:
            print(f"Error on attempt {attempt+1}: {e}")
            time.sleep(10)  # Short delay before retry
    return "Error: Unable to fetch response."

# Generate Q&A dataset
qa_data = []
for q in questions:
    print(f"Processing: {q}")
    answer = generate_tax_answer(q)
    qa_data.append({"messages": [{"role": "user", "content": q}, {"role": "assistant", "content": answer}]})
    time.sleep(5)  # Short delay to avoid hitting rate limits

# Save to JSONL
output_file = "taxease_finetune.jsonl"
with jsonlines.open(output_file, mode="w") as writer:
    writer.write_all(qa_data)

print(f"Data saved to {output_file}")